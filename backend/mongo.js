const mongoose = require("mongoose");
require("dotenv").config();

const db = process.env.DB_URL_TEST;

if (!db) {
  console.error("Error: url is not defined in the .env file.");
  process.exit(1);
}

mongoose.set("strictQuery", false);

mongoose.connect(db);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

try {
  if (process.argv.length === 3) {
    Person.find({}).then((result) => {
      result.forEach((person) => {
        console.log(person);
      });
      mongoose.connection.close();
    });
  } else if (process.argv.length === 5) {
    console.log(process.argv[3], process.argv[4]);
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
    });

    person.save().then((result) => {
      console.log("note saved!");
      console.log(result);
      mongoose.connection.close();
    });
    process.exit(1);
  } else {
    console.log("Unknown command");
    process.exit(1);
  }
} catch (error) {
  console.error(error);
  process.exit(1);
}
