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
    const sanitizedPersons = persons.map((person: any) => {
      const sanitizedPerson = person.toObject();
      sanitizedPerson.id = sanitizedPerson._id;
      delete sanitizedPerson._id;
      delete sanitizedPerson.__v;
      return sanitizedPerson;
    });
    if (Array.isArray(sanitizedPersons)) {
      return sanitizedPersons;
    }
    return [];
  } catch (e: Error | any) {
    console.log(e.message);
    return [];
  }
}

export async function getPerson(identifier: any) {
  try {
    const person = await PersonModel.findOne({
      _id: identifier.toString(),
    });
    if (!person) {
      throw new Error("Person not found");
    } else {
      return person;
    }
  } catch (e: Error | any) {
    console.log(e.message);
  }
}

export async function deletePerson(id: string) {
  console.log(id);
  try {
    const person = await PersonModel.findOne({ _id: id.toString() });
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
  await PersonModel.create(newPerson);
  console.log("Created: ", newPerson);
  const createdPerson = await PersonModel.findOne({ name: newPerson.name });
  console.log("Created: ", createdPerson);
  if (!createdPerson) {
    throw new Error("Failed to create person");
  }
  const sanitizedPerson: any = createdPerson.toObject();
  sanitizedPerson.id = sanitizedPerson._id;
  delete sanitizedPerson._id;
  delete sanitizedPerson.__v;
  return sanitizedPerson;
}

export async function updatePerson(id: string, person: Person) {
  // console.log(person[0]);
  try {
    const updatedPerson = await PersonModel.findByIdAndUpdate(
      { _id: id },
      { number: person.number },
      { new: true }
    );
    if (!updatedPerson) {
      throw new Error("Person not found");
    }
    console.log(updatedPerson);
    return updatedPerson;
  } catch (e: Error | any) {
    console.log(e.message);
  }
}

// export async function updatePerson(person: Person) {
//   try {
//     const personToUpdate = await getPerson(person.id);
//     if (!personToUpdate) {
//       throw new Error("Person not found");
//     }
//     const updatedPerson = { ...personToUpdate, number: person.number };
//     PersonModel.findByIdAndUpdate(personToUpdate._id, updatedPerson);
//     return updatedPerson;
//   } catch (e: Error | any) {
//     console.log(e.message);
//   }
// }
