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
const express_1 = require("express");
const personsService_1 = require("../service/personsService");
const CastError_1 = require("../errors/CastError");
const ValidationError_1 = require("../errors/ValidationError");
const personsController = (0, express_1.Router)();
personsController.get("/persons", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const persons = yield (0, personsService_1.getPersons)();
    console.log(persons);
    if (persons) {
        res.status(200).json(persons);
    }
    else {
        res.status(404).end();
    }
}));
// TODO: check error handling
personsController.get("/persons/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const person = yield (0, personsService_1.getPerson)(req.params.id);
        if (person) {
            console.log(person);
            res.status(200).json(person);
        }
        //  else {
        //   res.status(404).end();
        // }
    }
    catch (error) {
        console.log("caught an error!");
        next(new CastError_1.CastError());
    }
}));
personsController.delete("/persons/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const person = yield (0, personsService_1.deletePerson)(req.params.id);
    if (person) {
        res.status(204).end();
    }
    else {
        res.status(404).end();
    }
}));
personsController.post("/persons", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const person = req.body;
        const newPerson = yield (0, personsService_1.addPerson)(person);
        res.status(201).json(newPerson);
    }
    catch (e) {
        next(new ValidationError_1.ValidationError());
    }
}));
personsController.put("/persons/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const updatedPerson = yield (0, personsService_1.updatePerson)(req.params.id, body);
        res.status(200).json(updatedPerson);
    }
    catch (e) {
        next(new ValidationError_1.ValidationError());
    }
}));
exports.default = personsController;
