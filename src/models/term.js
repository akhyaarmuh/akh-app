import dbPool from '../config/database.js';

export const save = async (payload) => {
  const meta = payload.meta;
  const slug = payload.name.toLowerCase().replaceAll(' ', '-');
  const connection = await dbPool.getConnection();

  try {
    await connection.beginTransaction();

    // memasukkan data ke table term
    const [term] = await dbPool.execute(`INSERT INTO terms (name, slug) VALUES (?, ?)`, [
      payload.name,
      slug,
    ]);

    // memasukkan data ke termmeta
    for (let i = 0; i < meta.length; i++) {
      await dbPool.execute(
        `INSERT INTO termmeta (term_id, meta_key, meta_value, meta_extra) VALUES (?, ?, ?, ?)`,
        [term.insertId, meta[i].meta_key, meta[i].meta_value, meta[i].meta_extra]
      );
    }

    // memasukkan data ke table term_taxonomy
    await dbPool.execute(
      `INSERT INTO term_taxonomy (term_id, taxonomy, description, parent, author, biz) VALUES (?, ?, ?, ?)`,
      [
        term.insertId,
        payload.taxonomy,
        payload.description,
        payload.parent,
        payload.author,
        payload.biz,
      ]
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw { message: error.message };
  }
};

export default { save };
