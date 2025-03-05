import { getInfo } from "./infoService";
import { getPersons } from "./personsService";
import PersonModel from "../db/schema";

jest.mock("./personsService");

describe("getInfo", () => {
  it("should return the correct info object", async () => {
    const mockPersonsInfo = [
      new PersonModel({ name: "John Doe", number: "123-456-7890" }),
      new PersonModel({ name: "Jane Doe", number: "098-765-4321" }),
    ];
    console.log(mockPersonsInfo);
    (getPersons as jest.Mock).mockResolvedValue(mockPersonsInfo);

    const result = await getInfo();
    console.log(result);

    expect(result).toEqual({
      persons: mockPersonsInfo.length,
      time: expect.any(String),
    });
  });

  it("should handle empty persons array", async () => {
    (getPersons as jest.Mock).mockResolvedValue([]);

    const result = await getInfo();
    console.log(result);

    expect(result).toEqual({
      persons: 0,
      time: expect.any(String),
    });
  });

  it("should handle error from getPersons", async () => {
    (getPersons as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch persons")
    );

    await expect(getInfo()).rejects.toThrow("Failed to fetch persons");
  });
});
