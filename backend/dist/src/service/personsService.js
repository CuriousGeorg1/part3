"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPersons = getPersons;
exports.getPerson = getPerson;
exports.deletePerson = deletePerson;
exports.addPerson = addPerson;
exports.updatePerson = updatePerson;
const dotenv_1 = __importDefault(require("dotenv"));
const schema_1 = __importDefault(require("../db/schema"));
const CastError_1 = require("../errors/CastError");
const mongoose = require("mongoose");
dotenv_1.default.config();
const db = process.env.DB_URL_TEST;
mongoose.set("strictQuery", false);
mongoose.connect(db);
function getPersons() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const persons = yield schema_1.default.find({});
            const sanitizedPersons = persons.map((person) => {
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
        }
        catch (e) {
            console.log(e.message);
            return [];
        }
    });
}
function getPerson(identifier) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const person = yield schema_1.default.findOne({
                _id: identifier.toString(),
            });
            if (!person) {
                throw new Error("Person not found");
            }
            else {
                return person;
            }
        }
        catch (e) {
            console.log(e.message);
            new CastError_1.CastError();
        }
    });
}
function deletePerson(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(id);
        try {
            const person = yield schema_1.default.findOne({ _id: id.toString() });
            if (person) {
                yield schema_1.default.findByIdAndDelete(person._id);
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            console.log(e.message);
            return false;
        }
    });
}
function addPerson(person) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPerson = {
            name: person.name,
            number: person.number,
        };
        if ((yield schema_1.default.findOne({ name: newPerson.name })) ||
            (yield schema_1.default.findOne({ number: newPerson.number }))) {
            throw new Error("Name or number already exists");
        }
        else if (!newPerson.name || !newPerson.number) {
            throw new Error("Name or number missing");
        }
        console.log(newPerson);
        yield schema_1.default.create(newPerson);
        console.log("Created: ", newPerson);
        const createdPerson = yield schema_1.default.findOne({ name: newPerson.name });
        console.log("Created: ", createdPerson);
        if (!createdPerson) {
            throw new Error("Failed to create person");
        }
        const sanitizedPerson = createdPerson.toObject();
        sanitizedPerson.id = sanitizedPerson._id;
        delete sanitizedPerson._id;
        delete sanitizedPerson.__v;
        return sanitizedPerson;
    });
}
function updatePerson(id, person) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(person[0]);
        try {
            const updatedPerson = yield schema_1.default.findByIdAndUpdate({ _id: id }, { number: person.number }, { new: true });
            if (!updatedPerson) {
                throw new Error("Person not found");
            }
            console.log(updatedPerson);
            return updatedPerson;
        }
        catch (e) {
            console.log(e.message);
        }
    });
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
