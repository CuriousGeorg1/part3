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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPersons = getPersons;
exports.getPerson = getPerson;
exports.deletePerson = deletePerson;
exports.addPerson = addPerson;
function getPersons() {
    return __awaiter(this, void 0, void 0, function* () {
        return data;
    });
}
function getPerson(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return data.find((p) => p.id === id);
    });
}
function deletePerson(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const person = data.find((p) => p.id === id);
        if (person) {
            data = data.filter((p) => p.id !== id);
            return true;
        }
        else {
            return false;
        }
    });
}
function addPerson(person) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPerson = Object.assign({ id: Math.floor(Math.random() * 1000000).toString() }, person);
        if (data.find((p) => p.name === newPerson.name) ||
            data.find((p) => p.number === newPerson.number)) {
            throw new Error("Name or number already exists");
        }
        else if (!newPerson.name || !newPerson.number) {
            throw new Error("Name or number missing");
        }
        data.push(newPerson);
        return newPerson;
    });
}
let data = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];
