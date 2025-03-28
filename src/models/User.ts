export interface User {
  id?: number;
  name: string;
  surname: string;
  birth_date: string;
  sex: 'male' | 'female' | 'other';
  email: string;
  password?: string;
  created_at?: Date;
}

export interface PaginatedUsers {
  data: User[];
  total: number;
}