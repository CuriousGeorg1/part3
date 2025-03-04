"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const CastError_1 = require("../errors/CastError");
const errorHandler = (error, req, res, next) => {
    console.error(error.stack); // Log error stack for debugging
    if (error instanceof CastError_1.CastError) {
        res.status(error.statusCode).json(error.serialize());
        next(error);
    }
};
exports.errorHandler = errorHandler;
