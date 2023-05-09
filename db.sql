CREATE DATABASE urlshortener

CREATE TABLE url(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    userid VARCHAR(255),
    originalurl VARCHAR(255),
    shorturl VARCHAR(255)
);
CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    UNIQUE (email)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  useremail VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE url (
  id SERIAL PRIMARY KEY,
  shorturl VARCHAR(255) NOT NULL,
  longurl VARCHAR(255) NOT NULL,
  user_id INTEGER
);
