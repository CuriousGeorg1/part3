import { Router } from "express";
import { getPersons } from "../service/personsService";

const personsController = Router();

personsController.get("/persons", async (req, res) => {
  const persons = await getPersons();
  res.status(200).json(persons);
});

export default personsController;
