"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastError = void 0;
class CastError extends Error {
    constructor(message) {
        super("malformatted id");
        this.statusCode = 404;
        this.name = "CastError";
    }
    serialize() {
        return { error: this.message };
    }
}
exports.CastError = CastError;
