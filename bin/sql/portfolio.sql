CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS Project(
    pId SERIAL PRIMARY KEY,
    pName VARCHAR(128) NOT NULL,
    pLink TEXT,
    pDescription TEXT
);


CREATE TABLE IF NOT EXISTS WebUser(
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

--INSERT INTO Project(pName, pLink, pDescription) VALUES('Grossout', 'https://github.com/vanane/Grossout', 'Grossout is a small 2D game that has been inspired by Crossout. This is a top-down-view RPG made by myself, and also a practice exercice.');