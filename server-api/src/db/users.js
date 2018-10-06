import bcrypt from 'bcryptjs';
import pgclient from './dbConnection';

const password = 'fastadmin';
const hash = bcrypt.hashSync(password, 10);
const email = process.env.ADMIN_EMAIL;
const name = process.env.ADMIN_NAME;

const createUsersTB = (client) => {
  const query = `
    DROP TABLE IF EXISTS "users" CASCADE;
    CREATE TABLE "users" (
        "id" serial PRIMARY KEY,
        "role" VARCHAR(50) NOT NULL,
        "name" VARCHAR(50) NOT NULL,
        "email" VARCHAR(100) UNIQUE NOT NULL,
        "password" VARCHAR(100) NOT NULL,
        "dateCreated" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    INSERT INTO "users" (role, name, email, password)
    VALUES ('admin','${name}', '${email}','${hash}')`;

  client.query(query)
    .then(res => res)
    .catch(e => e);
};

createUsersTB(pgclient);
