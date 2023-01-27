import bcrypt from 'bcrypt';
import dbPool from '../config/database.js';

export const save = async (payload) => {
  const connection = await dbPool.getConnection();
  const sqlUsers = `INSERT INTO users 
  (username, password, nicename, email, url, type, full_name, biz) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash(payload.password, salt);

  try {
    await connection.beginTransaction();

    // memasukkan data ke table users
    const [user] = await dbPool.execute(sqlUsers, [
      payload.username,
      password,
      payload.nicename,
      payload.email,
      payload.url,
      payload.type,
      payload.full_name,
      payload.biz,
    ]);

    // memasukkan data ke usermeta
    payload.meta.forEach(async (meta) => {
      await dbPool.execute(
        `INSERT INTO usermeta (user_id, meta_key, meta_value, meta_extra) VALUES (?, ?, ?, ?)`,
        [user.insertId, meta.meta_key, meta.meta_value, meta.meta_extra]
      );
    });

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw { message: error.message };
  }
};

export const find = async () => {
  const SQLQuery = `SELECT users.id, users.username, users.nicename, users.email, users.url,
    users.type, users.status, users.full_name, users.biz,
    MAX(CASE usermeta.meta_key WHEN 'capabilities' THEN usermeta.meta_value END) as capabilities,
    MAX(CASE usermeta.meta_key WHEN 'whatsapp' THEN usermeta.meta_value END) as whatsapp
    FROM users 
    LEFT JOIN usermeta ON usermeta.user_id = users.id
    GROUP BY users.id`;
  try {
    const [users] = await dbPool.execute(SQLQuery);
    return users;
  } catch (error) {
    throw { message: error.message };
  }
};

export const findById = async (id) => {
  const SQLQuery = `SELECT users.id, users.username, users.nicename, users.email, users.url,
    users.type, users.status, users.full_name, users.biz,
    MAX(CASE usermeta.meta_key WHEN 'capabilities' THEN usermeta.meta_value END) as capabilities,
    MAX(CASE usermeta.meta_key WHEN 'whatsapp' THEN usermeta.meta_value END) as whatsapp
    FROM users 
    LEFT JOIN usermeta ON usermeta.user_id = users.id
    WHERE users.id = ?
    GROUP BY users.id`;
  try {
    const [users] = await dbPool.execute(SQLQuery, [id]);
    return users[0];
  } catch (error) {
    throw { message: error.message };
  }
};

export const findByUsername = async (username) => {
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
};

export const findByIdAndDeactive = async (id) => {
  try {
    await dbPool.execute(`UPDATE users SET status = 0 WHERE id = ?`, [id]);
  } catch (error) {
    throw { message: error.message };
  }
};

export const findByIdAndUpdate = async (id, payload) => {
  const connection = await dbPool.getConnection();
  const sqlUsers = `UPDATE users SET 
    username = ?, nicename = ?, email = ?, url = ?, type = ?, full_name = ?, biz = ?
    WHERE id = ?`;

  try {
    await connection.beginTransaction();

    // perbarui data ke table user
    await dbPool.execute(sqlUsers, [
      payload.username,
      payload.nicename,
      payload.email,
      payload.url,
      payload.type,
      payload.full_name,
      payload.biz,
      id,
    ]);

    // perbarui data ke usermeta
    payload.meta.forEach(async (meta) => {
      await dbPool.execute(
        `UPDATE usermeta SET meta_value = ? WHERE user_id = ? AND meta_key = ?`,
        [meta.meta_value, id, meta.meta_key]
      );
    });

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw { message: error.message };
  }
};

export const findByIdAndDelete = async (id) => {
  const SQLQuery = `DELETE FROM users WHERE id = ?`;
  try {
    await dbPool.execute(SQLQuery, [id]);
  } catch (error) {
    throw { message: error.message };
  }
};

export default {
  save,
  find,
  findById,
  findByUsername,
  findByIdAndDeactive,
  findByIdAndUpdate,
  findByIdAndDelete,
};
