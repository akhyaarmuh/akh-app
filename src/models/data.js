import dbPool from '../config/database.js';

export const save = async (payload) => {
  const data = payload.data;
  const meta = payload.meta;
  let idData = 0;
  let idImage = 0;
  const connection = await dbPool.getConnection();

  try {
    await connection.beginTransaction();

    // memasukkan data ke table data
    for (let i = 0; i < data.length; i++) {
      const [dataResponse] = await dbPool.execute(
        `INSERT INTO data (name, data_type, slug, author, biz) VALUES (?, ?, ?, ?, ?)`,
        [data[i].name, data[i].data_type, data[i].slug, data[i].author, data[i].biz]
      );
      if (i === 0) idData = dataResponse.insertId;
      if (i === 1) idImage = dataResponse.insertId;
    }

    // memasukkan data ke datameta
    for (let i = 0; i < meta.length; i++) {
      await dbPool.execute(
        `INSERT INTO datameta (data_id, meta_key, meta_value, meta_extra) VALUES (?, ?, ?, ?)`,
        [idData, meta[i].meta_key, meta[i].meta_value, meta[i].meta_extra]
      );
    }

    // jika ada gambar
    if (idImage)
      await dbPool.execute(
        `INSERT INTO datameta (data_id, meta_key, meta_value, meta_extra) VALUES (?, ?, ?, ?)`,
        [idData, 'featured_image', `${idImage}`, '']
      );

    await connection.commit();
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
    JOIN datameta ON datameta.data_id = data.id
    GROUP BY data.id`;
  try {
    const [data] = await dbPool.execute(SQLQuery);
    return data;
  } catch (error) {
    throw { message: error.message };
  }
};

export default { save, find };
