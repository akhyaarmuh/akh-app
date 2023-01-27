import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_host = process.env.db_host;

(async () => {
  const sqlTable = fs.readdirSync(path.join(__dirname, '..', 'sql_table'));
  let connection = await mysql.createConnection({
    host: db_host,
    user: db_user,
    password: db_password,
  });

  try {
    const [result] = await connection.execute(`CREATE DATABASE ${db_name}`);
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  connection = await mysql.createConnection({
    host: db_host,
    user: db_user,
    password: db_password,
    database: db_name,
  });

  for (let i = 0; i < sqlTable.length; i++) {
    const readDB = fs.readFileSync(`src/sql_table/${sqlTable[i]}`);
    const sql = readDB.toString();
    try {
      const [result] = await connection.execute(sql);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  process.exit(1);
})();
