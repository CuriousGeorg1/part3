import { getInfo } from "../service/infoService";

async function testGetInfo() {
  try {
    const info = await getInfo();
    console.log(info);
  } catch (error) {
    console.error("Error fetching info:", error);
  }
}

testGetInfo();
