-- DROP DATABASE IF EXISTS application;
-- CREATE DATABASE application;

-- \c application;

-- CREATE TABLE users (
--   ID SERIAL PRIMARY KEY,
--   username VARCHAR,
--   email VARCHAR,
--   age INTEGER,
--   sex VARCHAR,
--   firstName VARCHAR,
--   lastName VARCHAR,
--   telephone INTEGER,
--   lastLocation VARCHAR,
--   password VARCHAR
-- );

-- CREATE TABLE messages (
--   ID SERIAL PRIMARY KEY,
--   fromUserId VARCHAR,
--   toUserId VARCHAR,
--   message VARCHAR,
--   sentTime TIMESTAMP,
--   toUserRead BOOLEAN,
--   toUserReadTime TIMESTAMP
-- );

-- CREATE TABLE "session" (
--   "sid" varchar NOT NULL COLLATE "default",
-- 	"sess" json NOT NULL,
-- 	"expire" timestamp(6) NOT NULL
-- )
-- WITH (OIDS=FALSE);
-- ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;