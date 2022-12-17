import dbPool from '../config/database.js';

export const createBiz = (body) => {
  const SQLQuery = `INSERT INTO biz (name, slug) 
                    VALUES ('${body.name}', '${body.slug}')`;

  return dbPool.execute(SQLQuery);
};

export default { createBiz };
