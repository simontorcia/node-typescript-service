export const INSERT_USER = `
  INSERT INTO users (name, surname, birth_date, sex, email, password)
  VALUES (?, ?, ?, ?, ?, ?)
`;

export const GET_USER_BY_ID = `
  SELECT id, name, surname, birth_date, sex, email, created_at
  FROM users
  WHERE id = ?
`;

export const UPDATE_USER = (fields: string) => `
  UPDATE users SET ${fields} WHERE id = ?
`;

export const DELETE_USER = `
  DELETE FROM users WHERE id = ?
`;

export const GET_USERS_PAGINATED = `
  SELECT id, name, surname, birth_date, sex, email, created_at
  FROM users
  ORDER BY created_at DESC
  LIMIT ? OFFSET ?
`;

export const COUNT_USERS = `
  SELECT COUNT(*) as total FROM users
`;

export const GET_USER_BY_EMAIL = `
    SELECT id, name, surname, birth_date, sex, email, password, created_at
    FROM users
    WHERE email = ?
`;