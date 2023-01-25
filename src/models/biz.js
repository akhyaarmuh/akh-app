import dbPool from '../config/database.js';

export const save = async (payload) => {
  const connection = await dbPool.getConnection();
  const slug = payload.name.toLowerCase().replaceAll(' ', '-');
  try {
    await connection.beginTransaction();

    // memasukkan data ke table data
    const [biz] = await dbPool.execute(`INSERT INTO biz (name, slug) VALUES (?, ?)`, [
      payload.name,
      slug,
    ]);

    // memasukkan data ke metadata
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

export default { save };
