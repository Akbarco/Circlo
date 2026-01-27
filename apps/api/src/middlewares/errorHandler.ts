import { Request, Response, NextFunction } from "express";
import { Prisma } from "../generated/prisma/client";
import { AppError } from "../utils/AppError";

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);

  // AppError (expected error)
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errors: error.errors ?? null,
    });
  }

  // Prisma known error
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({
      success: false,
      message: error.message,
      errors: error.meta ?? null,
    });
  }

  // Unknown error
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
