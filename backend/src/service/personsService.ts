export async function getPersons() {
  return data;
}

export async function getPerson(id: string) {
  return data.find((p) => p.id === id);
}

export async function deletePerson(id: string) {
  const person = data.find((p) => p.id === id);
  if (person) {
    data = data.filter((p) => p.id !== id);
    return true;
  } else {
    return false;
  }
}

export async function addPerson(person: any) {
  const newPerson = {
    id: Math.floor(Math.random() * 1000000).toString(),
    ...person,
  };
  if (
    data.find((p) => p.name === newPerson.name) ||
    data.find((p) => p.number === newPerson.number)
  ) {
    throw new Error("Name or number already exists");
  } else if (!newPerson.name || !newPerson.number) {
    throw new Error("Name or number missing");
  }
  data.push(newPerson);
  return newPerson;
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
