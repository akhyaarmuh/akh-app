import dbPool from '../config/database.js';

export const createBizmeta = (biz_id, body) => {
  const SQLQuery = `INSERT INTO bizmeta (biz_id, meta_key, meta_value, meta_extra) 
                    VALUES (?, ?, ?, ?)`;

  return dbPool.execute(SQLQuery, [
    biz_id,
    body.meta_key,
    body.meta_value,
    body.meta_extra || null,
  ]);
};

export default { createBizmeta };
