'use strict';

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectPool = new _pg2.default.Pool(_config2.default.POOL);

var migrate = async function migrate() {
  // connection using created pool
  var client = await connectPool.connect();
  try {
    await client.query('BEGIN');
    try {
      await client.query('CREATE TABLE users(id SERIAL PRIMARY KEY, full_name VARCHAR(80) not null, email VARCHAR(80) not null, tot_entries INT DEFAULT 0, bio TEXT, password TEXT not null)');
      await client.query('CREATE TABLE diary(id SERIAL PRIMARY KEY, userId INTEGER not null, subject VARCHAR(200) not null, diary TEXT not null, date TIMESTAMP DEFAULT NOW())');
      await client.query('CREATE TABLE reminder(id SERIAL PRIMARY KEY, userId INTEGER not null, description TEXT not null, date TIMESTAMP not null)');
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    }
  } finally {
    client.release();
  }
};

migrate();