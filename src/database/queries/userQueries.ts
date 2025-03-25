export const INSERT_USER = `
  INSERT INTO users (name, surname, birth_date, sex)
  VALUES (?, ?, ?, ?)
`;

export const GET_USER_BY_ID = `
  SELECT * FROM users WHERE id = ?
`;

export const UPDATE_USER = (fields: string) => `
  UPDATE users SET ${fields} WHERE id = ?
`;

export const DELETE_USER = `
  DELETE FROM users WHERE id = ?
`;

export const GET_USERS_PAGINATED = `
  SELECT * FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?
`;

export const COUNT_USERS = `
  SELECT COUNT(*) as total FROM users
`;
