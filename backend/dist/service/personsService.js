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
const dotenv_1 = __importDefault(require("dotenv"));
const schema_1 = __importDefault(require("../db/schema"));
const mongoose = require("mongoose");
dotenv_1.default.config();
const db = process.env.DB_URL_TEST;
mongoose.set("strictQuery", false);
mongoose.connect(db);
function getPersons() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const persons = yield schema_1.default.find({});
            return persons;
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
                id: identifier.toString(),
            });
            if (!person) {
                throw new Error("Person not found");
            }
            return person;
        }
        catch (e) {
            console.log(e.message);
            return { id: "", name: "", number: "" };
        }
    });
}
function deletePerson(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const person = yield schema_1.default.findOne({ id: id });
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
            id: Math.floor(Math.random() * 1000000).toString(),
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
        schema_1.default.create(newPerson);
        return newPerson;
    });
}
