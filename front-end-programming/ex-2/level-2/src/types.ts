export interface User {
  id: number;
  name: string;
  age: number;
  grade: string;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  column: keyof User;
  direction: SortDirection;
}

export interface FilterConfig {
  column: keyof User;
  value: string;
}

export interface TableConfig {
  sort: SortConfig;
  filters: FilterConfig[];
  highlightRules: {
      column: keyof User;
      value: string;
      color: string;
  }[];
}