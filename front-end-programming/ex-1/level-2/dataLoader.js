import { renderTableRows } from "./tableRenderer.js";

async function loadData() {
  try {
    const response = await fetch("students.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    renderTableRows(data);
  } catch (error) {
    console.error("Failed to load data:", error);
  }
}

loadData();
