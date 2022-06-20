import { Request, Response } from "express";
import {
  CreateUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyUserInput,
} from "../schemas/user.schema";
import {
  createUser,
  FindUserByEmail,
  FindUserById,
} from "../services/user.services";
import sendEmail from "../utils/mailer";
import { v4 as uuidv4 } from "uuid";

export async function CreateUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;

  try {
    const user = await createUser(body);

    await sendEmail({
      from: "test@example.com",
      to: user.email,
      subject: "Welcome to the app, please verify your email",
      text: `Please verify your email with this code: ${user.verificationCode} and the id: ${user._id}`,
    });

    return res.send("User created successfully");
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).send("User already exists");
    }
    console.log(error);
    return res.status(400).send(error);
  }
}

export async function verifyUserHandler(
  req: Request<VerifyUserInput>,
  res: Response
) {
  const { id, verificationCode } = req.params;

  try {
    const user = await FindUserById(id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.verified) {
      return res.status(400).send("User already verified");
    }

    if (user.verificationCode !== verificationCode) {
      return res.status(400).send("Invalid verification code");
    }

    user.verified = true;
    await user.save();

    return res.send("User verified successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
}

export async function forgotPasswordHandler(
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response
) {
  const { email } = req.body;

  try {
    const user = await FindUserByEmail(email);

    if (!user) {
      return res
        .status(404)
        .send(
          "User not found, please check your email and verify your account"
        );
    }

    if (!user.verified) {
      return res.status(400).send("User is not verified");
    }

    user.passwordResetCode = uuidv4();

    await user.save();

    await sendEmail({
      from: "test@test.com",
      to: user.email,
      subject: "Reset your password",
      text: `Please reset your password with this code: ${user.passwordResetCode} and the id: ${user._id}`,
    });

    return res.send(
      "If a user with that email is registered, you will receive an email with a link to reset your passwordt"
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
}

export async function resetPasswordHandler(
  req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
  res: Response
) {
  const { id, passwordResetCode } = req.params;
  const { password } = req.body;

  try {
    const user = await FindUserById(id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (!user.passwordResetCode) {
      return res.status(400).send("User has not requested a password reset");
    }

    if (user.passwordResetCode !== passwordResetCode) {
      return res.status(400).send("Invalid password reset code");
    }

    user.passwordResetCode = null;
    user.password = password;

    await user.save();

    return res.send("Password reset successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
}

export async function getCurrenUserHandler(_req: Request, res: Response) {
  const user = res.locals.user;

  if (!user) {
    return res.status(401).send("User not found");
  }

  return res.send(user);
}
