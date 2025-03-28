export interface User {
  id?: number;
  name: string;
  surname: string;
  birth_date: string;
  sex: 'M' | 'F' | 'O';
  email: string;
  password?: string;
  created_at?: Date;
}

export interface PaginatedUsers {
  data: User[];
  total: number;
}