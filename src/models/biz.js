import dbPool from '../config/database.js';

export const createBiz = async (body) => {
  const SQLQuery = `INSERT INTO biz (name, slug) VALUES (?, ?)`;

  return dbPool.execute(SQLQuery, [body.name, body.slug]);
};

export const getAllBiz = async () => {
  const SQLQuery = `SELECT b.id 'biz_id', b.name 'biz_name', b.slug 'biz_slug', 
                           bm_whatsapp.meta_value AS wahatsapp, bm_address.meta_value AS address
                    FROM biz AS b 
                    LEFT JOIN bizmeta AS bm_whatsapp ON b.id =  bm_whatsapp.biz_id
                    LEFT JOIN bizmeta AS bm_address ON b.id =  bm_address.biz_id
                    WHERE bm_whatsapp.meta_key = 'whatsapp' AND bm_address.meta_key = 'address' 
                    `;

  return dbPool.execute(SQLQuery);
};

export default { createBiz, getAllBiz };
