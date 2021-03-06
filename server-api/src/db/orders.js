import pgclient from './dbConnection';


const createOrdersTB = (client) => {
  const query = `
    DROP TABLE IF EXISTS "orders" CASCADE;
    CREATE TABLE "orders" (
        "id" serial PRIMARY KEY,
        "meal" VARCHAR(50) NOT NULL,
        "userId" INTEGER NOT NULL,
        "quantity" INTEGER NOT NULL,
        "price" INTEGER NOT NULL,
        "status" VARCHAR(20) NOT NULL,
        "dateCreated" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`;

  client.query(query)
    .then(res => res)
    .catch(e => e.message);
};

createOrdersTB(pgclient);
