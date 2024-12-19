import { fetchData } from "./utils/fetchData";
import { parseCSV, RowData } from "./utils/parseCSV";
import { createDataGrid } from "./components/dataGrid";
import "./style.scss";

const init = async () => {
  try {
    const csvContent = await fetchData("./data/data.csv");

    const rowData: RowData[] = parseCSV(csvContent);

    const columnDefs = [
      { field: "ID" },
      { field: "Name" },
      { field: "Age" },
      { field: "Grade" },
    ];

    createDataGrid(
      "myGrid",
      rowData.map((row) => {
        return {
          ID: row.ID,
          Name: row.Name,
          Age: row.Age,
          Grade: row.Grade,
        };
      }),
      columnDefs
    );
  } catch (error) {
    console.error("Error initializing the app:", error);
  }
};

init();
