CREATE TABLE movies(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "category" VARCHAR(20) NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" INTEGER NOT NULL
);

