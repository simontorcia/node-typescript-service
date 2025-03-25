export const INSERT_GROUP = `
  INSERT INTO \`groups\` (name)
  VALUES (?)
`;

export const GET_GROUP_BY_ID = `
  SELECT * FROM \`groups\` WHERE id = ?
`;

export const UPDATE_GROUP = (fields: string) => `
  UPDATE \`groups\` SET ${fields} WHERE id = ?
`;

export const DELETE_GROUP = `
  DELETE FROM \`groups\` WHERE id = ?
`;

export const GET_ALL_GROUPS = `
  SELECT * FROM \`groups\` ORDER BY created_at DESC
`;

export const GET_GROUPS_PAGINATED = `
  SELECT * FROM \`groups\` ORDER BY created_at DESC LIMIT ? OFFSET ?
`;

export const COUNT_GROUPS = `SELECT COUNT(*) as total FROM \`groups\``;