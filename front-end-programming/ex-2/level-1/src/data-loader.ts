import { User } from "./types";

export async function loadJsonData(): Promise<User[]> {
  try {
    const response = await fetch("/data/data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as User[];
  } catch (error) {
    console.error("Error loading JSON:", error);
    throw error;
  }
}
