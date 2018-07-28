module.exports = {

  PORT: process.env.PORT,
  DATABASE_URL: 'postgres://andela:andela@127.0.0.1:5432/myDiary',
  SECRET: 'asdfghjkl',
  POOL: {
    user: 'andela', // env var: PGUSER
    database: 'myDiary', // env var: PGDATABASE
    password: 'andela', // env var: PGPASSWORD
    host: '127.0.0.1', // Server hosting the postgres database
    port: 5432, // env var: PGPORT
    max: 10, // max number of clients in the pool
  }
}