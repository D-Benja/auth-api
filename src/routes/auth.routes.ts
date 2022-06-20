import express from "express";
import validateResources from "../middleware/validateResources";
import {
  createSessionHandler,
  logoutHandler,
  refreshAccessTokenHandler,
} from "../controllers/auth.controller";
import { CreateSessionSchema } from "../schemas/auth.schema";
import requireUser from "../middleware/requireUser";

const router = express.Router();

router.post(
  "/api/session",
  validateResources(CreateSessionSchema),
  createSessionHandler
);

router.post("/api/session/logout", requireUser, logoutHandler);

router.post("/api/session/refresh", refreshAccessTokenHandler);

export default router;
