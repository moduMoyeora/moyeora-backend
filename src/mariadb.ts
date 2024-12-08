import mysql from 'mysql2/promise'; // 또는 'mariadb'
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'Moyeora',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
