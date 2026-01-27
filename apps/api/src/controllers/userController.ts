import type { Request, Response, NextFunction } from "express";
import { signUpSchema } from "../utils/schema/user";
import * as userService from "../services/userService";
import { AppError } from "../utils/AppError";
import fs from "node:fs";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
   
    if (!req.file) {
      throw new AppError("Upload photo is required", 400);
    }

    // 2. validasi body
    const parse = signUpSchema.safeParse(req.body);

    if (!parse.success) {
      const errors = parse.error.issues.map(
        (err) => `${err.path.join(".")} - ${err.message}`,
      );

      // cleanup file
      fs.unlinkSync(req.file.path);

      throw new AppError("Validation error", 400, errors);
    }

    // 3. service
    const newUser = await userService.signUp(parse.data, req.file);

    // 4. success response
    return res.status(201).json({
      success: true,
      message: "Create user success",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};
