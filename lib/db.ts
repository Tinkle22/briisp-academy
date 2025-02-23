import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

// const sslCertPath = process.env.DATABASE_SSL_CA;

// if (!sslCertPath) {
//   throw new Error("DATABASE_SSL_CA environment variable is not defined.");
// }

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
// ssl: {
//   ca: fs.readFileSync(path.resolve(process.cwd(), sslCertPath)),
// },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;