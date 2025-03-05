import e from "express";
import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
});

const PersonModel = mongoose.model("Person", personSchema);

export default PersonModel;
export { personSchema };
