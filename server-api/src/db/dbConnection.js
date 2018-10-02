import dotenv from 'dotenv';
import pg, { Pool } from 'pg';

dotenv.config();
// let sslValue;
if (process.env === 'production') {
  pg.defaults.ssl = true;
} else {
  pg.defaults.ssl = false;
}
const dbclient = new Pool({
  connectionString: process.env.PG_DB_CONNECTION_URL, ssl: pg.defaults.ssl,
});

export default dbclient;
