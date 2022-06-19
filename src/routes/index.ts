import express from "express";

//routes
import user from "./user.routes";
import auth from "./auth.routes";

const router = express.Router();

//health check
router.get("/health", (_req, res) => {
  res.sendStatus(200);
});

router.use(user);
router.use(auth);

export default router;
