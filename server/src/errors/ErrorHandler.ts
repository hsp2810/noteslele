import { NextFunction, Request, Response } from "express";
import { isHttpError } from "http-errors";

export default (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorMsg = "Internal Server Error";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMsg = error.message;
  }
  res.status(statusCode).json({ error: errorMsg });
  next();
};
