import pg from 'pg';
import url from 'url';
import configjson from '../config';

let connectPool = null;
if (process.env.DATABASE_URL) {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');
  const config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true,
  };
  connectPool = new pg.Pool(config);
} else {
  connectPool = new pg.Pool(configjson.development.POOL);
}

/**
 * Database migration script
 * @method
 */
exports.migrate = async () => {
  const client = await connectPool.connect();
  try {
    await client.query('BEGIN');
    try {
      await client.query('CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, full_name VARCHAR(80) not null, email VARCHAR(80) not null, tot_entries INT DEFAULT 0, bio TEXT, password TEXT not null)');
      await client.query('CREATE TABLE IF NOT EXISTS diary(id SERIAL PRIMARY KEY, userId INTEGER not null, subject VARCHAR(200) not null, diary TEXT not null, date TIMESTAMP DEFAULT NOW())');
      await client.query('CREATE TABLE IF NOT EXISTS reminder(id SERIAL PRIMARY KEY, userId INTEGER not null, description TEXT not null, date TIMESTAMP not null)');
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    }
  } finally {
    client.release();
  };
};
