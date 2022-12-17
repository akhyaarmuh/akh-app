import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_host = process.env.db_host;

const dbPool = mysql.createPool({
  host: db_host,
  database: db_name,
  user: db_user,
  password: db_password,
});

export default dbPool.promise();
