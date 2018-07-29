'use strict';

module.exports = {
  development: {
    // DATABASE_URL: 'postgres://postgres:andela@localhost:5432/myDiary',
    PORT: process.env.PORT,
    SECRET: 'asdfghjkl',
    POOL: {
      user: 'postgres', // env var: PGUSER
      database: 'myDiary', // env var: PGDATABASE
      // password: '', // env var: PGPASSWORD
      // host: 'localhost', // Server hosting the postgres database
      // port: 5432, // env var: PGPORT
      max: 20 // max number of clients in the pool
    }
  },
  production: {
    environment: 'production',
    PORT: process.env.PORT,
    SECRET: process.env.SECRET_KEY,
    POOL: {
      user: process.env.DB_USER, // env var: PGUSER
      database: process.env.DB_NAME, // env var: PGDATABASE
      password: process.env.DB_PASS, // env var: PGPASSWORD
      host: process.env.DB_HOST, // Server hosting the postgres database
      port: process.env.DB_PORT, // env var: PGPORT
      max: 10 // max number of clients in the pool
    }
  }
};