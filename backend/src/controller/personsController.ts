import { Router } from "express";
import {
  getPersons,
  getPerson,
  deletePerson,
  addPerson,
} from "../service/personsService";

const personsController = Router();

personsController.get("/persons", async (req, res) => {
  const persons = await getPersons();
  console.log(persons);
  if (persons) {
    res.status(200).json(persons);
  } else {
    res.status(404).end();
  }
});

personsController.get("/persons/:id", async (req, res) => {
  const person = await getPerson(req.params.id);
  if (person) {
    console.log(person);
    res.status(200).json(person);
  } else {
    res.status(404).end();
  }
});

personsController.delete("/persons/:id", async (req, res) => {
  const person = await deletePerson(req.params.id);
  if (person) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

personsController.post("/persons", async (req, res) => {
  const person = req.body;
  try {
    const newPerson = await addPerson(person);
    res.status(201).json(newPerson);
  } catch (e: Error | any) {
    res.status(400).json({ error: e.message });
  }
});

export default personsController;
