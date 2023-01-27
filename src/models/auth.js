import dbPool from '../config/database.js';

export const getUserByUsername = async (username) => {
  const SQLQuery = `SELECT u.id AS user_id, u.biz, u.password AS user_pass,
    MAX(CASE um.meta_key WHEN 'capabilities' THEN um.meta_value END) AS capabilities
    FROM users AS u 
    JOIN usermeta AS um ON um.user_id = u.id 
    WHERE u.username = ?
    GROUP BY u.id`;

  try {
    const [users] = await dbPool.execute(SQLQuery, [username]);
    return users[0] || {};
  } catch (error) {
    throw { message: error.message };
  }

  return dbPool.execute(SQLQuery, [username]);
};

export default { getUserByUsername };
