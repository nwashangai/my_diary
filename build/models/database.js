'use strict';

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectionString = 'postgres://postgres:1234@localhost:5432/myDiary';

var client = new _pg2.default.Client(connectionString);
client.connect();
var users = client.query('CREATE TABLE users(id SERIAL PRIMARY KEY, full_name VARCHAR(80) not null, email VARCHAR(80) not null, tot_entries INT DEFAULT 0, bio TEXT, password TEXT not null)');
users.on('end', function () {
  var diary = client.query('CREATE TABLE diary(id SERIAL PRIMARY KEY, userId INTEGER not null, subject VARCHAR(200) not null, diary TEXT not null, date TIMESTAMP DEFAULT NOW())');
  diary.on('end', function () {
    var reminder = client.query('CREATE TABLE reminder(id SERIAL PRIMARY KEY, userId INTEGER not null, description TEXT not null, date TIMESTAMP not null)');
    reminder.on('end', function () {
      client.end();
    });
  });
});