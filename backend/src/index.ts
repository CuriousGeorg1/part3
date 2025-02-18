import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import personsController from "./controller/personsController";
import infoController from "./controller/infoController";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use("/api", personsController);
app.use("/info", infoController);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
