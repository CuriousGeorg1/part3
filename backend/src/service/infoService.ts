import { getPersons } from "./personsService";

export async function getInfo() {
  const data = await getPersons();
  console.log(data);
  const info = {
    info: `Phonebook has info for ${data.length} people`,
    date: new Date(),
  };
  return info;
}
