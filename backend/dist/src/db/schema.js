"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const personSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /\d{2,3}-\d{6,8}/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
});
exports.personSchema = personSchema;
const PersonModel = mongoose_1.default.model("Person", personSchema);
exports.default = PersonModel;
