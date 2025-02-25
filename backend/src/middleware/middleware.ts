import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: Error | any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  console.error(error.stack);
  response.status(500).json({ error: "internal server error" });
};
