"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const personsController_1 = __importDefault(require("./controller/personsController"));
const infoController_1 = __importDefault(require("./controller/infoController"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const port = process.env.PORT || 3001;
var morgan = require("morgan");
const app = (0, express_1.default)();
app.use(morgan("tiny"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", personsController_1.default);
app.use("/info", infoController_1.default);
app.use(express_1.default.static("dist"));
// app.use(errorHandler); // Commented out to acoid errors
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
