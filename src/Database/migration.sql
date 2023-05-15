CREATE DATABASE urlshortener



CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  useremail VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE url (
  id SERIAL PRIMARY KEY,
  shorturl VARCHAR(255) NOT NULL,
  longurl VARCHAR(255) NOT NULL,
  urlexpiration BIGINT,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE user_roles (
  user_id INTEGER NOT NULL REFERENCES users (id),
  role_id INTEGER NOT NULL REFERENCES roles (id),
  PRIMARY KEY (user_id, role_id)
);