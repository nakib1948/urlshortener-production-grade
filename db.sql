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
