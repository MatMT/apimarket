import mysql from 'mysql2/promise';
import 'dotenv/config';

export const PORT = process.env.PORT || 3000;

export const DB_HOST = process.env.MYSQLHOST || process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.MYSQLPORT || process.env.DB_PORT || 3306;
export const DB_USER = process.env.MYSQLUSER || process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '';
export const DB_DATABASE = process.env.MYSQLDATABASE || process.env.DB_DATABASE || 'test';

const isCloud = DB_HOST !== 'localhost' && DB_HOST !== '127.0.0.1';

export const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: Number(DB_PORT),
  ssl: isCloud ? { minVersion: 'TLSv1.2', rejectUnauthorized: true } : undefined,
});