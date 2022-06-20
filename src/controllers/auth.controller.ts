// if the application need to add google auth, facebook auth, twitter auth, etc.
// we can add the logic of these auth functions here

import { Request, Response } from "express";
import { CreateSessionInput } from "../schemas/auth.schema";
import {
  findSessionById,
  signAccessToken,
  signRefreshToken,
} from "../services/auth.service";
import { FindUserByEmail, FindUserById } from "../services/user.services";
import { verifyJwt } from "../utils/jwt";
import { clearTokens, setTokens } from "../utils/token-utils";

export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) {
  const { email, password } = req.body;

  const user = await FindUserByEmail(email);

  if (!user) {
    return res.status(400).json({
      error: "Invalid Email or Password",
    });
  }

  if (!user.verified) {
    return res.status(400).json({
      error: "Please verify your email first",
    });
  }

  const isValid = await user.ValidatePassword(password);

  if (!isValid) {
    return res.status(400).json({
      error: "Invalid Email or Password",
    });
  }

  //sign access token
  const accessToken = signAccessToken(user);

  //sign refresh token

  const refreshToken = await signRefreshToken({ userId: user._id });

  //set tokens
  setTokens(res, accessToken, refreshToken);

  return res.status(200).json({
    message: "Login Successful",
  });
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {
  const refreshToken = req.cookies.RefreshToken;

  try {
    if (!refreshToken) {
      return res.status(400).json({
        error: "No refresh token",
      });
    }

    const payload = await verifyJwt<{ session: string }>(
      refreshToken,
      "refreshTokenPublicKey"
    );

    if (!payload) {
      return res.status(400).json({
        error: "Invalid refresh token",
      });
    }

    const session = await findSessionById(payload.session);

    if (!session || !session.valid) {
      return res.status(400).json({
        error: "Invalid refresh token",
      });
    }

    const user = await FindUserById(String(session.user));

    if (!user) {
      return res.status(400).json({
        error: "Invalid refresh token",
      });
    }

    const accessToken = signAccessToken(user);

    setTokens(res, accessToken, refreshToken);

    return res.status(200).json({
      message: "Refresh Successful",
    });
  } catch (error) {
    return clearTokens(res);
  }
}

export async function logoutHandler(_req: Request, res: Response) {
  clearTokens(res);

  return res.status(200).json({
    message: "Logout Successful",
  });
}
