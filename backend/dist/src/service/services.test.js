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
const infoService_1 = require("./infoService");
const personsService_1 = require("./personsService");
const schema_1 = __importDefault(require("../db/schema"));
jest.mock("./personsService");
describe("getInfo", () => {
    it("should return the correct info object", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPersonsInfo = [
            new schema_1.default({ name: "John Doe", number: "123-456-7890" }),
            new schema_1.default({ name: "Jane Doe", number: "098-765-4321" }),
        ];
        console.log(mockPersonsInfo);
        personsService_1.getPersons.mockResolvedValue(mockPersonsInfo);
        const result = yield (0, infoService_1.getInfo)();
        console.log(result);
        expect(result).toEqual({
            persons: mockPersonsInfo.length,
            time: expect.any(String),
        });
    }));
    it("should handle empty persons array", () => __awaiter(void 0, void 0, void 0, function* () {
        personsService_1.getPersons.mockResolvedValue([]);
        const result = yield (0, infoService_1.getInfo)();
        console.log(result);
        expect(result).toEqual({
            persons: 0,
            time: expect.any(String),
        });
    }));
    it("should handle error from getPersons", () => __awaiter(void 0, void 0, void 0, function* () {
        personsService_1.getPersons.mockRejectedValue(new Error("Failed to fetch persons"));
        yield expect((0, infoService_1.getInfo)()).rejects.toThrow("Failed to fetch persons");
    }));
});
