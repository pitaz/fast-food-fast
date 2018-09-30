import pgclient from '../index';

const createMenuTB = (client) => {
  const query = `
    DROP TABLE IF EXISTS "menu" CASCADE;
    CREATE TABLE "menu" (
        "id" serial PRIMARY KEY,
        "name" VARCHAR(50) NOT NULL,
        "desc" VARCHAR(100) UNIQUE NOT NULL,
        "image" VARCHAR(100) NOT NULL,
        "price" VARCHAR(100) NOT NULL,
        "dateCreated" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`;

  client.query(query)
    .then(res => res)
    .catch(e => e.message);
};

createMenuTB(pgclient);
