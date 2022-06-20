import express from "express";
import {
  CreateUserHandler,
  forgotPasswordHandler,
  getCurrenUserHandler,
  resetPasswordHandler,
  verifyUserHandler,
} from "../controllers/user.controller";
import requireUser from "../middleware/requireUser";
import validateResources from "../middleware/validateResources";
import {
  CreateUserSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  VerifyUserSchema,
} from "../schemas/user.schema";

const router = express.Router();

router.post(
  "/api/users",
  validateResources(CreateUserSchema),
  CreateUserHandler
);

// if the user receives a verification link on their email, the method below will be GET

// router.get(
//   "/api/users/verify/:id/:verificationCode",
//   verifyUserHandler
// );

router.post(
  "/api/users/verify/:id/:verificationCode",
  validateResources(VerifyUserSchema),
  verifyUserHandler
);

router.post(
  "/api/users/forgotPassword",
  validateResources(ForgotPasswordSchema),
  forgotPasswordHandler
);

router.post(
  "/api/users/restePassword/:id/:passwordResetCode",
  validateResources(ResetPasswordSchema),
  resetPasswordHandler
);

router.get("/api/users/me", requireUser, getCurrenUserHandler);

export default router;
