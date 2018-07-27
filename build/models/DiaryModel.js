'use strict';

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectPool = new _pg2.default.Pool(_config2.default.POOL);

// reference from https://gist.github.com/zerbfra/70b155fa00b4e0d6fd1d4e090a039ad4
var query = async function query(data) {
  var client = await connectPool.connect();
  var res = null;
  try {
    await client.query('BEGIN');
    try {
      res = await client.query(data);
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    }
  } finally {
    client.release();
  }
  return res;
};

exports.data = [{
  entryID: '1', subject: 'This is Andela', dairy: 'Andela is an American company that specializes in training software developers. The company was founded in 2014 and is based in New York City.', date: '2018 july 2 3:34 PM'
}, {
  entryID: '2', subject: 'This is Africa', dairy: 'Africa is the world\'s second largest and second most- populous continent. At about 30.3 million km² including adjacent islands, it covers 6% of Earth\'s total surface area and 20% of its land area.', date: '2018 May 21 12:34 AM'
}];

exports.signUp = async function (userData) {
  try {
    // SQL Query > Insert Data
    var _ref = await query('INSERT INTO users(full_name, email, password) values(\'' + userData.full_name + '\', \'' + userData.email + '\', \'' + userData.password + '\')'),
        res = _ref.res;

    return { status: 'success', message: res };
  } catch (error) {
    return { status: 'error', message: error };
  }
};

exports.login = async function (email) {
  try {
    // SQL Query > get Data
    return { status: 'success', data: await query('SELECT * FROM users WHERE email = \'' + email + '\'') };
  } catch (error) {
    return { status: 'error', message: error };
  }
};

exports.getAllEntry = async function (userId) {
  try {
    // SQL Query > get entry
    return { status: 'success', data: await query('SELECT * FROM diary WHERE userid = \'' + userId + '\'') };
  } catch (error) {
    return { status: 'error', message: error };
  }
};

exports.getEntry = async function (info) {
  try {
    // SQL Query > get entry
    return { status: 'success', data: await query('SELECT * FROM diary WHERE userid = \'' + info.userId + '\' AND id = \'' + info.entry + '\'') };
  } catch (error) {
    return { status: 'error', message: error };
  }
};