export interface Group {
  id: number;
  name: string;
  created_at: Date;
}

export interface PaginatedGroups {
  data: Group[];
  total: number;
}