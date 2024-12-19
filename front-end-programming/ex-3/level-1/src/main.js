import students from "./data/data.json";
console.log(students);

const gridOptions = {
  columnDefs: [
    { field: "ID", sortable: true, filter: true },
    { field: "Name", sortable: true, filter: true },
    { field: "Age", sortable: true, filter: true },
    { field: "Grade", sortable: true, filter: true },
  ],

  rowData: students.map((student) => {
    return {
      ID: student.id,
      Name: student.name,
      Age: student.age,
      Grade: student.grade,
    };
  }),
};

const myGridElement = document.querySelector("#myGrid");
agGrid.createGrid(myGridElement, gridOptions);
