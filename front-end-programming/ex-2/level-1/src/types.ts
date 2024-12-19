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

