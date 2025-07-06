-- This file is used to create the database schema for the userapi application.
-- It creates a table named 'users' with columns for username, firstname, and lastname.
-- This schema is used to store user information in the MySQL database.

CREATE TABLE IF NOT EXISTS users (
  username VARCHAR(255) PRIMARY KEY,
  firstname VARCHAR(255),
  lastname VARCHAR(255)
);