/* eslint-disable import/no-mutable-exports */
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

let db;
if (process.env.NODE_ENV === 'production') {
  db = new Pool({ connectionString, ssl: true });
} else if (process.env.NODE_ENV === 'development') {
  db = new Pool({ connectionString });
} else {
  db = new Pool({ connectionString });
}

export default db;
