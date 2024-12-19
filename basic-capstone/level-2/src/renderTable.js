export function renderTable(data, tableBody) {
  tableBody.innerHTML = "";
  data.forEach((item) => {
    const row = document.createElement("tr");

    const titleCell = document.createElement("td");
    titleCell.textContent = item.title || "No Title";

    const abstractCell = document.createElement("td");
    abstractCell.textContent = item.abstract || "No Abstract";

    const yearCell = document.createElement("td");
    yearCell.textContent = item.year || "No Year";

    const citationsCell = document.createElement("td");
    citationsCell.textContent = item.n_citation || "No Citations";

    row.appendChild(titleCell);
    row.appendChild(abstractCell);
    row.appendChild(yearCell);
    row.appendChild(citationsCell);

    tableBody.appendChild(row);
  });
}
