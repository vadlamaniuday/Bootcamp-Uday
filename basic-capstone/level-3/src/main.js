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
  let rowsPerPage = 20;

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
  const themeToggleButton = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  themeToggleButton.addEventListener("click", () => {
    if (htmlElement.classList.contains("light-mode")) {
      htmlElement.classList.remove("light-mode");
      themeToggleButton.textContent = "Switch to Light Mode";
    } else {
      htmlElement.classList.add("light-mode");
      themeToggleButton.textContent = "Switch to Dark Mode";
    }
  });

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
  }, 300);

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
