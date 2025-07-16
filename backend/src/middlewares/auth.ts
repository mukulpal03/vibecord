import { clerkClient } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.auth.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized - you must be signed in" });
    }
    next();
  } catch (error: any) {
    next(error);
  }
};

export const checkAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.emailAddresses[0].emailAddress;

    if (!isAdmin) {
      return res
        .status(401)
        .json({ message: "Unauthorized - you must be admin" });
    }

    next();
  } catch (error: any) {
    next(error);
  }
};
