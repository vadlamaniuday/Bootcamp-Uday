// main.js
import { fetchData } from "./fetchData.js";
import { exportFilteredData } from "./handleExport.js";
import { applyFilters, clearFilters } from "./handleFilter.js";
import { renderPapers } from "./renderTable.js";
import { debounce } from "./debounce.js";
import "./style.css";

document.addEventListener("DOMContentLoaded", async () => {
  const papers = await fetchData("/data.json");

  let filteredPapers = papers;
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
  const paperList = document.getElementById("paper-list");

  const applyFiltersDebounced = debounce(() => {
    filteredPapers = applyFilters(
      papers,
      titleFilter,
      minCitations,
      startYear,
      endYear
    );
    currentPage = 1;
    renderPapers(
      filteredPapers,
      currentPage,
      rowsPerPage,
      paperList,
      pageInfo,
      prevPageButton,
      nextPageButton
    );
  }, 300); // Debounce delay of 300ms

  titleFilter.addEventListener("input", applyFiltersDebounced);
  minCitations.addEventListener("input", applyFiltersDebounced);
  startYear.addEventListener("input", applyFiltersDebounced);
  endYear.addEventListener("input", applyFiltersDebounced);

  clearFiltersButton.addEventListener("click", () => {
    clearFilters(titleFilter, minCitations, startYear, endYear);
    filteredPapers = papers;
    currentPage = 1;
    renderPapers(
      filteredPapers,
      currentPage,
      rowsPerPage,
      paperList,
      pageInfo,
      prevPageButton,
      nextPageButton
    );
  });

  exportButton.addEventListener("click", () => {
    exportFilteredData(filteredPapers);
  });

  rowsPerPageSelect.addEventListener("change", (event) => {
    rowsPerPage = parseInt(event.target.value, 10);
    currentPage = 1;
    renderPapers(
      filteredPapers,
      currentPage,
      rowsPerPage,
      paperList,
      pageInfo,
      prevPageButton,
      nextPageButton
    );
  });

  prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPapers(
        filteredPapers,
        currentPage,
        rowsPerPage,
        paperList,
        pageInfo,
        prevPageButton,
        nextPageButton
      );
    }
  });

  nextPageButton.addEventListener("click", () => {
    if (currentPage < Math.ceil(filteredPapers.length / rowsPerPage)) {
      currentPage++;
      renderPapers(
        filteredPapers,
        currentPage,
        rowsPerPage,
        paperList,
        pageInfo,
        prevPageButton,
        nextPageButton
      );
    }
  });

  renderPapers(
    filteredPapers,
    currentPage,
    rowsPerPage,
    paperList,
    pageInfo,
    prevPageButton,
    nextPageButton
  );
});
