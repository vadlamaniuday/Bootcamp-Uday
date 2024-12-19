export function renderTableRows(data) {
  const tbody = document.querySelector("#studentTable tbody");

  data.forEach((student) => {
    const row = document.createElement("tr");
    row.classList.add("highlight");

    const idCell = document.createElement("td");
    idCell.textContent = student.id;
    row.appendChild(idCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = student.name;
    row.appendChild(nameCell);

    const ageCell = document.createElement("td");
    ageCell.textContent = student.age;
    row.appendChild(ageCell);

    const gradeCell = document.createElement("td");
    gradeCell.textContent = student.grade;
    row.appendChild(gradeCell);

    tbody.appendChild(row);
  });
}
