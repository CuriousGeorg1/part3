import { CustomError } from "./CustomError";

export class ValidationError extends CustomError {
  constructor() {
    super("Malformatted name or number!");
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
  statusCode = 406;
  serialize() {
    return { message: "Malformatted name or number" };
  }
}
