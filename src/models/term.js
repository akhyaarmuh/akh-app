import dbPool from '../config/database.js';

export const save = async (payload) => {
  const meta = payload.meta;
  const slug = payload.name.toLowerCase().replaceAll(' ', '-');
  const connection = await dbPool.getConnection();

  try {
    await connection.beginTransaction();

    // memasukkan data ke table term
    const [term] = await dbPool.execute(
      `INSERT INTO terms (name, biz, slug) VALUES (?, ?, ?)`,
      [payload.name, payload.biz, slug]
    );

    // memasukkan data ke termmeta
    for (let i = 0; i < meta.length; i++) {
      await dbPool.execute(
        `INSERT INTO termmeta (term_id, meta_key, meta_value, meta_extra) VALUES (?, ?, ?, ?)`,
        [term.insertId, meta[i].meta_key, meta[i].meta_value, meta[i].meta_extra]
      );
    }

    // memasukkan data ke table term_taxonomy
    await dbPool.execute(
      `INSERT INTO term_taxonomy (term_id, taxonomy, description, parent, author, biz) VALUES (?, ?, ?, ?, ?, ?)`,
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

export const find = async () => {
  const SQLQuery = `SELECT t.id, name, slug, term_group,
    MAX(CASE termmeta.meta_key WHEN 'featured_image' THEN termmeta.meta_value END) as featured_image,
    MAX(CASE term_taxonomy.term_id WHEN t.id THEN term_taxonomy.taxonomy END) as taxonomy,
    MAX(CASE term_taxonomy.term_id WHEN t.id THEN term_taxonomy.description END) as description,
    MAX(CASE term_taxonomy.term_id WHEN t.id THEN term_taxonomy.parent END) as parent,
    MAX(CASE term_taxonomy.term_id WHEN t.id THEN term_taxonomy.count END) as count,
    MAX(CASE term_taxonomy.term_id WHEN t.id THEN term_taxonomy.author END) as author,
    MAX(CASE term_taxonomy.term_id WHEN t.id THEN term_taxonomy.status END) as status
    FROM terms AS t
    LEFT JOIN termmeta ON termmeta.term_id = t.id
    JOIN term_taxonomy ON term_taxonomy.term_id = t.id
    GROUP BY id`;

  try {
    const [term] = await dbPool.execute(SQLQuery);
    return term;
  } catch (error) {
    throw { message: error.message };
  }
};

export default { save, find };
