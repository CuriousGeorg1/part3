"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const CustomError_1 = require("./CustomError");
class ValidationError extends CustomError_1.CustomError {
    constructor() {
        super("Malformatted name or number!");
        this.statusCode = 406;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
    serialize() {
        return { message: "Malformatted name or number" };
    }
}
exports.ValidationError = ValidationError;
