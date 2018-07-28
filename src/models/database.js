import pg from 'pg';
import config from '../config';

const connectionString = 'postgres://postgres:1234@localhost:5432/myDiary_test';

const client = new pg.Client(connectionString);
client.connect();
const users = client.query(
  'CREATE TABLE users(id SERIAL PRIMARY KEY, full_name VARCHAR(80) not null, email VARCHAR(80) not null, tot_entries INT DEFAULT 0, bio TEXT, password TEXT not null)'
);
users.on('end', () => {
  const diary = client.query(
    'CREATE TABLE diary(id SERIAL PRIMARY KEY, userId INTEGER not null, subject VARCHAR(200) not null, diary TEXT not null, date TIMESTAMP DEFAULT NOW())'
  );
  diary.on('end', () => {
    const reminder = client.query(
      'CREATE TABLE reminder(id SERIAL PRIMARY KEY, userId INTEGER not null, description TEXT not null, date TIMESTAMP not null)'
    );
    reminder.on('end', () => { client.end(); });
  });
});
