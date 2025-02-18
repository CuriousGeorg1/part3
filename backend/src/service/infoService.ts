import { getPersons } from "./personsService";

export async function getInfo() {
  const data = await getPersons();
  const info = {
    persons: data.length,
    time: new Date().toUTCString(),
  };
  return info;
}
