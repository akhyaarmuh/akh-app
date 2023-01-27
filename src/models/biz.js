import dbPool from '../config/database.js';

export const save = async (payload) => {
  const connection = await dbPool.getConnection();
  const slug = payload.name.toLowerCase().replaceAll(' ', '-');

  try {
    await connection.beginTransaction();

    // memasukkan data ke table biz
    const [biz] = await dbPool.execute(`INSERT INTO biz (name, slug) VALUES (?, ?)`, [
      payload.name,
      slug,
    ]);

    // memasukkan data ke bizmeta
    payload.meta.forEach(async (meta) => {
      await dbPool.execute(
        `INSERT INTO bizmeta (biz_id, meta_key, meta_value, meta_extra) VALUES (?, ?, ?, ?)`,
        [biz.insertId, meta.meta_key, meta.meta_value, meta.meta_extra]
      );
    });

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw { message: error.message };
  }
};

export const find = async () => {
  const SQLQuery = `SELECT biz.id, biz.name, biz.slug, biz.status,
    MAX(CASE bizmeta.meta_key WHEN 'address' THEN bizmeta.meta_value END) as address,
    MAX(CASE bizmeta.meta_key WHEN 'whatsapp' THEN bizmeta.meta_value END) as whatsapp
    FROM biz 
    LEFT JOIN bizmeta ON bizmeta.biz_id = biz.id
    GROUP BY biz.id`;
  try {
    const [bizs] = await dbPool.execute(SQLQuery);
    return bizs;
  } catch (error) {
    throw { message: error.message };
  }
};

export const findById = async (id) => {
  const SQLQuery = `SELECT biz.id, biz.name, biz.slug, biz.status,
    MAX(CASE bizmeta.meta_key WHEN 'address' THEN bizmeta.meta_value END) as address,
    MAX(CASE bizmeta.meta_key WHEN 'whatsapp' THEN bizmeta.meta_value END) as whatsapp
    FROM biz 
    LEFT JOIN bizmeta ON bizmeta.biz_id = biz.id
    WHERE biz.id = ?
    GROUP BY biz.id`;
  try {
    const [bizs] = await dbPool.execute(SQLQuery, [id]);
    return bizs[0];
  } catch (error) {
    throw { message: error.message };
  }
};

export const findByIdAndDeactive = async (id) => {
  try {
    await dbPool.execute(`UPDATE biz SET status = 0 WHERE id = ?`, [id]);
  } catch (error) {
    throw { message: error.message };
  }
};

export const findByIdAndUpdate = async (id, payload) => {
  const connection = await dbPool.getConnection();

  try {
    await connection.beginTransaction();

    // perbarui data ke table biz
    await dbPool.execute(`UPDATE biz SET name = ? WHERE id = ?`, [payload.name, id]);

    // perbarui data ke bizmeta
    payload.meta.forEach(async (meta) => {
      await dbPool.execute(
        `UPDATE bizmeta SET meta_value = ? WHERE biz_id = ? AND meta_key = ?`,
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
  const SQLQuery = `DELETE FROM biz WHERE id = ?`;
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
  findByIdAndDeactive,
  findByIdAndUpdate,
  findByIdAndDelete,
};
