import "./style.css";

import { fetchData } from "./fetchData.js";
import { renderTable } from "./renderTable.js";
import { handleFilter } from "./handleFilter.js";
import { handleExport } from "./handleExport.js";
import { debounce } from "./debounce.js";

document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchData();
  let filteredData = data;
  let currentPage = 1;
  let rowsPerPage = 50;

  const titleFilter = document.getElementById("title-filter");
  const minCitations = document.getElementById("min-citations");
  const startYear = document.getElementById("start-year");
  const endYear = document.getElementById("end-year");
  const exportButton = document.getElementById("export");
  const clearFiltersButton = document.getElementById("clear-filters");
  const rowsPerPageSelect = document.getElementById("rows-per-page");
  const prevPageButton = document.getElementById("prev-page");
  const nextPageButton = document.getElementById("next-page");
  const pageInfo = document.getElementById("page-info");
  const tableBody = document.getElementById("paper-list");

  const applyFiltersDebounced = debounce(() => {
    filteredData = handleFilter(
      data,
      titleFilter,
      minCitations,
      startYear,
      endYear
    );
    currentPage = 1;
    renderPaginatedTable(filteredData);
  }, 300);

  titleFilter.addEventListener("input", applyFiltersDebounced);
  minCitations.addEventListener("input", applyFiltersDebounced);
  startYear.addEventListener("input", applyFiltersDebounced);
  endYear.addEventListener("input", applyFiltersDebounced);

  clearFiltersButton.addEventListener("click", () => {
    titleFilter.value = "";
    minCitations.value = "";
    startYear.value = "";
    endYear.value = "";
    filteredData = data;
    currentPage = 1;
    renderPaginatedTable(filteredData);
  });

  exportButton.addEventListener("click", () => {
    handleExport(filteredData);
  });

  rowsPerPageSelect.addEventListener("change", (event) => {
    rowsPerPage = parseInt(event.target.value, 10);
    currentPage = 1;
    renderPaginatedTable(filteredData);
  });

  prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPaginatedTable(filteredData);
    }
  });

  nextPageButton.addEventListener("click", () => {
    if (currentPage < Math.ceil(filteredData.length / rowsPerPage)) {
      currentPage++;
      renderPaginatedTable(filteredData);
    }
  });

  function renderPaginatedTable(data) {
    console.log("Rendering data:", data.length);
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = data.slice(start, end);

    renderTable(paginatedData, tableBody);

    pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(
      data.length / rowsPerPage
    )}`;
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled =
      currentPage === Math.ceil(data.length / rowsPerPage);
  }

  renderPaginatedTable(filteredData);
});
