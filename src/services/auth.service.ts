import { DocumentType } from "@typegoose/typegoose";
import SessionModel from "../models/session.model";
import { privateFields, User } from "../models/user.model";
import { signJwt } from "../utils/jwt";
import { omit } from "lodash";
import { TokenExpiration } from "../utils/cookiesOptions";

export async function createSession({ userId }: { userId: string }) {
  return SessionModel.create({
    user: userId,
  });
}

export function signAccessToken(user: DocumentType<User>) {
  const payload = omit(user.toJSON(), privateFields);

  const accessToken = signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: TokenExpiration.Access,
  });

  return accessToken;
}

export async function signRefreshToken({ userId }: { userId: string }) {
  const session = await createSession({
    userId,
  });

  const refreshToken = signJwt(
    {
      session: session._id,
    },
    "refreshTokenPrivateKey",
    {
      expiresIn: TokenExpiration.Refresh,
    }
  );

  return refreshToken;
}

export async function findSessionById(id: string) {
  return SessionModel.findById(id);
}
