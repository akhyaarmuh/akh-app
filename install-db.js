import fs from 'fs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_host = process.env.db_host;

(async () => {
  const sqlTable = fs.readdirSync('src/sql_table');
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
