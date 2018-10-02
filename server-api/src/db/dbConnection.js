import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const dbclient = new Pool({
  connectionString: process.env.PG_DB_CONNECTION_URL,
});

export default dbclient;
