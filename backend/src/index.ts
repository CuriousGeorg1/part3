import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import personsController from "./controller/personsController";
import infoController from "./controller/infoController";
import cors from "cors";
import { errorHandler } from "./middleware/middleware";
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import { CustomError } from "./errors/CustomError";
import { CastError } from "./errors/CastError";

dotenv.config();
const port = process.env.PORT || 3001;
var morgan = require("morgan");

const app: Express = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

app.use("/api", personsController);
app.use("/info", infoController);
app.use(express.static("dist"));

// app.all("*", async (req: Request, res: Response, next: NextFunction) => {
//   console.log("We are in app.all");
//   next(new CastError());
// });

app.use(errorHandler); // Commented out to acoid errors

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
