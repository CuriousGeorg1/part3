import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { CastError } from "../errors/CastError";

export const errorHandler: ErrorRequestHandler = (
  error: Error & { name?: String },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error.stack);

  if (error instanceof CastError) {
    res.status(error.statusCode).json(error.serialize());
    // res.send("error");
    next(error);
  }
};
