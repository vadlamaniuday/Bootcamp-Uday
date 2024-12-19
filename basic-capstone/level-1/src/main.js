import "./style.css";
document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/data.json");
  const papers = await response.json();
  console.log("Loaded papers:", papers);

  const paperList = document.getElementById("paper-list");

  papers.forEach((paper) => {
    const row = document.createElement("tr");

    const titleCell = document.createElement("td");
    titleCell.textContent = paper.title || "No Title";

    const abstractCell = document.createElement("td");
    abstractCell.textContent = paper.abstract || "No Abstract";

    const yearCell = document.createElement("td");
    yearCell.textContent = paper.year || "No Year";

    const citationsCell = document.createElement("td");
    citationsCell.textContent = paper.n_citation || "No Citations";

    row.appendChild(titleCell);
    row.appendChild(abstractCell);
    row.appendChild(yearCell);
    row.appendChild(citationsCell);

    paperList.appendChild(row);
  });
});
