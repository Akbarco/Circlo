import type { Request, Response, NextFunction } from "express";
import { signInSchema, signUpSchema } from "../utils/schema/user";
import * as userService from "../services/userService";
import { AppError } from "../utils/AppError";
import fs from "node:fs";
import { successResponse } from "../utils/response";
import app from "../app";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) {
      throw new AppError("Upload photo is required", 400);
    }

    const parse = signUpSchema.safeParse(req.body);

    if (!parse.success) {
      const errors = parse.error.issues.map(
        (err) => `${err.path.join(".")} - ${err.message}`,
      );

      fs.unlinkSync(req.file.path);

      throw new AppError("Validation error", 400, errors);
    }

    const newUser = await userService.signUp(parse.data, req.file);

    return successResponse(res, "User created successfully", newUser, 201);
  } catch (error) {
    next(error);
  }
};

export const signIN = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parse = signInSchema.safeParse(req.body);

    if (!parse.success) {
      throw new AppError("Validation error", 400, parse.error.issues);
    }

    const data = await userService.signIN(parse.data);
    return successResponse(res, "Sign in success", data, 200);
  } catch (error) {
    next(error);
  }
};
