import express from "express";
import {
  CreateUserHandler,
  verifyUserHandler,
} from "../controllers/user.controller";
import validateResources from "../middleware/validateResources";
import { CreateUserSchema, VerifyUserSchema } from "../schemas/user.schema";

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

export default router;
