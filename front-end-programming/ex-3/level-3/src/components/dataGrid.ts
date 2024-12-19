import {
  AllCommunityModule,
  ColDef,
  GridApi,
  GridOptions,
  ModuleRegistry,
  createGrid,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  id: number;
  name: string;
  age: number;
  grade: string;
}
let gridApi: GridApi;
export function createDataGrid(
  containerId: string,
  rowData: any[],
  columnDefs: ColDef[]
): void {
  const gridOptions: GridOptions<IRow> = {
    columnDefs,
    rowData,
    defaultColDef: {
      flex: 1,
    },
  };

  const gridDiv = document.getElementById(containerId);
  if (!gridDiv) {
    throw new Error(`Container with ID "${containerId}" not found.`);
  }

  gridApi = createGrid(
    document.querySelector<HTMLElement>("#myGrid")!,
    gridOptions
  );
}
