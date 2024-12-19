import { loadCsvData } from "./csv-loader";
import { TableRenderer } from "./table-renders";

async function initializeApp() {
  try {
    const tableRenderer = new TableRenderer("app");
    const data = await loadCsvData("data/students.csv");
    tableRenderer.setData(data);
  } catch (error) {
    console.error("Failed to initialize app:", error);
    const errorElement = document.createElement("div");
    errorElement.className = "error";
    errorElement.textContent = "Failed to load data. Please try again later.";
    document.getElementById("app")?.appendChild(errorElement);
  }
}

document.addEventListener("DOMContentLoaded", initializeApp);
