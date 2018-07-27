'use strict';

module.exports = {

  PORT: process.env.PORT,
  DATABASE_URL: 'postgres://postgres:@localhost:5432/myDiary',
  SECRET: 'asdfghjkl',
  POOL: {
    user: 'postgres', // env var: PGUSER
    database: 'myDiary', // env var: PGDATABASE
    password: '', // env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, // env var: PGPORT
    max: 10 // max number of clients in the pool
  }
};