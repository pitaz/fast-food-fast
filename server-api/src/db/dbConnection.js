import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
let sslValue;
if (process.env === 'production') {
  sslValue = true;
} else {
  sslValue = false;
}
const dbclient = new Pool({
  connectionString: process.env.PG_DB_CONNECTION_URL, ssl: sslValue,
});

export default dbclient;
