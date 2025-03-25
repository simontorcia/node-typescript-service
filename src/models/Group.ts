export interface Group {
  id: number;
  name: string;
  created_at: Date;
  // description?: string;
}

export interface PaginatedGroups {
  data: Group[];
  total: number;
}