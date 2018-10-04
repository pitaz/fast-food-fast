import pgclient from './dbConnection';

const createMenuTB = (client) => {
  const query = `
    DROP TABLE IF EXISTS "menu" CASCADE;
    CREATE TABLE "menu" (
        "id" serial PRIMARY KEY,
        "name" VARCHAR(50) NOT NULL,
        "description" VARCHAR(100) NOT NULL,
        "image" VARCHAR(100) NOT NULL,
        "price" INTEGER NOT NULL,
        "dateCreated" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`;

  client.query(query)
    .then(res => res)
    .catch(e => e.message);
};

createMenuTB(pgclient);
