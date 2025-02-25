"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, request, response, next) => {
    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    }
    console.error(error.stack);
    response.status(500).json({ error: "internal server error" });
};
exports.errorHandler = errorHandler;
