export const CHECK_USER_EXISTS = `
  SELECT id FROM users WHERE id = ?
`;

export const CHECK_GROUP_EXISTS = `
  SELECT id FROM groups WHERE id = ?
`;

export const CHECK_USER_GROUP_RELATION = `
  SELECT 1 FROM user_groups WHERE user_id = ? AND group_id = ?
`;

export const INSERT_USER_GROUP = `
  INSERT INTO user_groups (user_id, group_id) VALUES (?, ?)
`;

export const DELETE_USER_GROUP = `
  DELETE FROM user_groups WHERE user_id = ? AND group_id = ?
`;

export const GET_GROUPS_FOR_USER = `
  SELECT g.* FROM groups g
  JOIN user_groups ug ON g.id = ug.group_id
  WHERE ug.user_id = ?
`;

export const GET_GROUP_USERS = `
  SELECT u.* FROM users u
  JOIN user_groups ug ON u.id = ug.user_id
  WHERE ug.group_id = ?
`;

export const GET_GROUP_USERS_PAGINATED = `
  SELECT u.* FROM users u
  JOIN user_groups ug ON u.id = ug.user_id
  WHERE ug.group_id = ?
  LIMIT ? OFFSET ?
`;

export const GET_USER_GROUPS_PAGINATED = `
  SELECT g.* FROM groups g
  JOIN user_groups ug ON g.id = ug.group_id
  WHERE ug.user_id = ?
  LIMIT ? OFFSET ?
`;

export const COUNT_GROUP_USERS = `
  SELECT COUNT(*) as total FROM user_groups WHERE group_id = ?
`;

export const COUNT_USER_GROUPS = `
  SELECT COUNT(*) as total FROM user_groups WHERE user_id = ?
`;
