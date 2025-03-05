import { Request, Response, NextFunction } from "express";
import { CastError } from "../errors/CastError";
import { ValidationError } from "../errors/ValidationError";
import { CustomError } from "../errors/CustomError";
import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error.stack);

  if (error instanceof CustomError) {
    res.status(error.statusCode).json(error.serialize());
  }
  // if (error instanceof CastError) {
  //   res.status(error.statusCode).json(error.serialize());
  //   // res.send("error");
  //   next(error);
  // }

  // if (error instanceof ValidationError) {
  //   res.status(error.statusCode).json(error.serialize());
  //   next(error);
  // }
};
