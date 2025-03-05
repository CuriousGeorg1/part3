"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const CustomError_1 = require("../errors/CustomError");
const errorHandler = (error, req, res, next) => {
    console.error(error.stack);
    if (error instanceof CustomError_1.CustomError) {
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
exports.errorHandler = errorHandler;
