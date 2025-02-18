import { Router } from "express";
import { getInfo } from "../service/infoService";

const infoController = Router();

infoController.get("/", async (req, res) => {
  const info = await getInfo();
  res.status(200).json(info);
});

export default infoController;
