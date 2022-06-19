import { Request, Response } from "express";
import { CreateUserInput, VerifyUserInput } from "../schemas/user.schema";
import { createUser, FindUserById } from "../services/user.services";
import sendEmail from "../utils/mailer";

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
