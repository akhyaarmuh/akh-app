import dbPool from '../config/database.js';

export const getUserByName = async (username) => {
  const SQLQuery = `SELECT u.id AS user_id, u.biz, um.meta_value AS capabilities FROM users AS u JOIN usermeta AS um ON (um.user_id = u.id and um.meta_key = 'capabilities') WHERE u.user_login = ?;`;

  return dbPool.execute(SQLQuery, [username]);
};
