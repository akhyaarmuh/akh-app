import dbPool from '../config/database.js';

export const save = async (payload) => {
  const meta = payload.meta || [];
  const slug = payload.name.toLowerCase().replaceAll(' ', '-');
  const connection = await dbPool.getConnection();

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
    MAX(CASE datameta.meta_key WHEN 'featured_image' THEN datameta.meta_value END ) AS featured_image,
    MAX(CASE datameta.meta_key WHEN 'featured_image' THEN datameta.meta_extra END ) AS name_image
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

export const findById = async (id) => {
  const SQLQuery = `SELECT id, name, slug, author, biz,
    MAX(CASE datameta.meta_key WHEN 'price' THEN datameta.meta_value END ) AS price,
    MAX(CASE datameta.meta_key WHEN 'resell_commission' THEN datameta.meta_value END ) AS resell_commission,
    MAX(CASE datameta.meta_key WHEN 'description' THEN datameta.meta_value END ) AS description,
    MAX(CASE datameta.meta_key WHEN 'featured_image' THEN datameta.meta_value END ) AS featured_image,
    MAX(CASE datameta.meta_key WHEN 'featured_image' THEN datameta.meta_extra END ) AS name_image
    FROM data
    LEFT JOIN datameta ON datameta.data_id = data.id
    WHERE data.data_type = 'product' AND data.id = ?
    GROUP BY data.id`;
  try {
    const [data] = await dbPool.execute(SQLQuery, [id]);
    return data[0];
  } catch (error) {
    throw { message: error.message };
  }
};

export const findByIdAndUpdateMedia = async (id, payload) => {
  const slug = payload.name.toLowerCase().replaceAll(' ', '-');
  const sqlData = `UPDATE data SET 
  name = ?, slug = ?, data_type = 'media'
  WHERE id = ?`;
  const connection = await dbPool.getConnection();

  try {
    const { featured_image } = await findById(id);
    await connection.beginTransaction();

    // perbarui data ke table biz
    await dbPool.execute(sqlData, [payload.name, slug, Number(featured_image)]);

    // perbarui data ke bizmeta
    await dbPool.execute(
      `UPDATE datameta SET meta_extra = ? WHERE data_id = ? AND meta_key = 'featured_image'`,
      [payload.name, id]
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw { message: error.message };
  }
};

export const findByIdAndUpdate = async (id, payload) => {
  const meta = payload.meta || [];
  const slug = payload.name.toLowerCase().replaceAll(' ', '-');
  const sqlData = `UPDATE data SET 
  name = ?, slug = ?, data_type = ?
  WHERE id = ?`;
  const connection = await dbPool.getConnection();

  try {
    await connection.beginTransaction();

    // perbarui data ke table biz
    await dbPool.execute(sqlData, [payload.name, slug, payload.data_type, id]);

    // perbarui data ke bizmeta
    for (let i = 0; i < meta.length; i++) {
      await dbPool.execute(
        `UPDATE datameta SET meta_value = ?, meta_extra = ? WHERE data_id = ? AND meta_key = ?`,
        [meta[i].meta_value, meta[i].meta_extra, id, meta[i].meta_key]
      );
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw { message: error.message };
  }
};

export const findByIdAndDelete = async (id) => {
  const sqlGet = `SELECT datameta.meta_value AS id_image, datameta.meta_extra as name_image
    FROM data 
    JOIN datameta ON datameta.meta_key = 'featured_image' where id = ?`;
  const connection = await dbPool.getConnection();

  try {
    await connection.beginTransaction();
    const [data] = await dbPool.execute(sqlGet, [id]);
    await dbPool.execute(`DELETE FROM data WHERE id IN (?, ?)`, [
      id,
      Number(data[0].id_image),
    ]);
    await connection.commit();
    return data[0].name_image;
  } catch (error) {
    await connection.rollback();
    throw { message: error.message };
  }
};

export default {
  save,
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndUpdateMedia,
  findByIdAndDelete,
};
