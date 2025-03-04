import { CustomError } from "./CustomError";

export class CastError extends CustomError {
  constructor() {
    super("malformatted id");
    Object.setPrototypeOf(this, CastError.prototype);
  }
  statusCode = 400;
  serialize() {
    return { message: "malformatted id" };
  }
}
