export const calculatePagination = (
  page: number,
  pageSize: number
): { offset: number; limit: number } => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  return { offset, limit };
};

export const createPaginationMetadata = (
  currentPage: number,
  totalItems: number,
  pageSize: number
): { currentPage: number; totalPages: number } => {
  const totalPages = Math.ceil(totalItems / pageSize);
  return { currentPage, totalPages };
};
