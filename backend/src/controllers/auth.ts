import User from "../models/user";
import { NextFunction, Request, Response } from "express";

export const authCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    const user = await User.findOne({ clerkId: id });

    if (!user) {
      await User.create({
        fullName: `${firstName} ${lastName}`,
        imageUrl,
        clerkId: id,
      });
    }

    res.status(200).json({ success: true });
  } catch (error: any) {
    next(error);
  }
};
