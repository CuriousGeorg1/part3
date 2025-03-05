"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastError = void 0;
const CustomError_1 = require("./CustomError");
class CastError extends CustomError_1.CustomError {
    constructor() {
        super("malformatted id");
        this.statusCode = 400;
        Object.setPrototypeOf(this, CastError.prototype);
    }
    serialize() {
        return { message: "malformatted id" };
    }
}
exports.CastError = CastError;
