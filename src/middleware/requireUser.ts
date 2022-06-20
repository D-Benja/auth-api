import { NextFunction, Request, Response } from "express";

const requireUser = (_req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return res.status(401).json({
      error: "You must be logged in to access this resource",
    });
  }
  return next();
};

export default requireUser;
