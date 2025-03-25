export interface User {
  id?: number;
  name: string;
  surname: string;
  birth_date: string; // YYYY-MM-DD
  sex: 'male' | 'female' | 'other';
  created_at?: Date;
}

export interface PaginatedUsers {
  data: User[];
  total: number;
}