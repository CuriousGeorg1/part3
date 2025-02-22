import dotenv from "dotenv";
import PersonModel from "../db/schema";
import Person from "../types/person";

const mongoose = require("mongoose");
dotenv.config();
const db = process.env.DB_URL_TEST;

mongoose.set("strictQuery", false);
mongoose.connect(db);

export async function getPersons(): Promise<Person[]> {
  try {
    const persons = await PersonModel.find({});
    return persons;
  } catch (e: Error | any) {
    console.log(e.message);
    return [];
  }
}

export async function getPerson(identifier: any): Promise<Person> {
  try {
    const person = await PersonModel.findOne({
      id: identifier.toString(),
    });
    if (!person) {
      throw new Error("Person not found");
    }
    return person;
  } catch (e: Error | any) {
    console.log(e.message);
    return { id: "", name: "", number: "" };
  }
}

export async function deletePerson(id: string) {
  try {
    const person = await PersonModel.findOne({ id: id });
    if (person) {
      await PersonModel.findByIdAndDelete(person._id);
      return true;
    } else {
      return false;
    }
  } catch (e: Error | any) {
    console.log(e.message);
    return false;
  }
}

export async function addPerson(person: Person) {
  const newPerson: Person = {
    id: Math.floor(Math.random() * 1000000).toString(),
    name: person.name,
    number: person.number,
  };
  if (
    (await PersonModel.findOne({ name: newPerson.name })) ||
    (await PersonModel.findOne({ number: newPerson.number }))
  ) {
    throw new Error("Name or number already exists");
  } else if (!newPerson.name || !newPerson.number) {
    throw new Error("Name or number missing");
  }
  console.log(newPerson);
  PersonModel.create(newPerson);
  return newPerson;
}
