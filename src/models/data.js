import dbPool from '../config/database.js';

export const save = async (payload) => {
  const meta = payload.meta || [];
  const connection = await dbPool.getConnection();
  const slug = payload.name.toLowerCase().replaceAll(' ', '-');

  try {
    await connection.beginTransaction();

    // memasukkan data ke table data
    const [data] = await dbPool.execute(
      `INSERT INTO data (name, data_type, slug, author, biz) VALUES (?, ?, ?, ?, ?)`,
      [payload.name, payload.data_type, slug, payload.author, payload.biz]
    );

    // memasukkan data ke datameta
    for (let i = 0; i < meta.length; i++) {
      await dbPool.execute(
        `INSERT INTO datameta (data_id, meta_key, meta_value, meta_extra) VALUES (?, ?, ?, ?)`,
        [data.insertId, meta[i].meta_key, meta[i].meta_value, meta[i].meta_extra]
      );
    }

    await connection.commit();
    return data;
  } catch (error) {
    await connection.rollback();
    throw { message: error.message };
  }
};

export const find = async () => {
  const SQLQuery = `SELECT id, name, slug, author, biz,
    MAX(CASE datameta.meta_key WHEN 'price' THEN datameta.meta_value END ) AS price,
    MAX(CASE datameta.meta_key WHEN 'resell_commission' THEN datameta.meta_value END ) AS resell_commission,
    MAX(CASE datameta.meta_key WHEN 'description' THEN datameta.meta_value END ) AS description,
    MAX(CASE datameta.meta_key WHEN 'featured_image' THEN datameta.meta_value END ) AS feature_image
    FROM data
    LEFT JOIN datameta ON datameta.data_id = data.id
    WHERE data.data_type = 'product'
    GROUP BY data.id`;
  try {
    const [data] = await dbPool.execute(SQLQuery);
    return data;
  } catch (error) {
    throw { message: error.message };
  }
};

export default { save, find };
