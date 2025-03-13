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
    validate: {
      validator: function (v: string) {
        return /\d{2,3}-\d{6,8}/.test(v);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid phone number!`,
    },
  },
});

const PersonModel = mongoose.model("Person", personSchema);

export default PersonModel;
export { personSchema };
