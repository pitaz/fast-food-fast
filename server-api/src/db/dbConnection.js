/* eslint-disable import/no-mutable-exports */
import dotenv from 'dotenv';
import { Pool } from 'pg';
// import config from '../config/config';

dotenv.config();

const connectionString = process.env.PG_DB_CONNECTION_URL;
// const connectionStringTest = process.env.PG_DB_CONNECTION_URL_TEST;

let db;
if (process.env.NODE_ENV === 'production') {
  db = new Pool({ connectionString });
} else if (process.env.NODE_ENV === 'development') {
  db = new Pool({ connectionString });
} else {
  db = new Pool({ connectionString });
}

export default db;
