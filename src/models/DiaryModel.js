import pg from 'pg';
import config from '../config';

const connectPool = new pg.Pool(config.POOL);

// reference from https://gist.github.com/zerbfra/70b155fa00b4e0d6fd1d4e090a039ad4
const query = async (data) => {
  const client = await connectPool.connect();
  let res = null;
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

exports.data = [
  {
    entryID: '1', subject: 'This is Andela', dairy: 'Andela is an American company that specializes in training software developers. The company was founded in 2014 and is based in New York City.', date: '2018 july 2 3:34 PM',
  },
  {
    entryID: '2', subject: 'This is Africa', dairy: 'Africa is the world\'s second largest and second most- populous continent. At about 30.3 million km² including adjacent islands, it covers 6% of Earth\'s total surface area and 20% of its land area.', date: '2018 May 21 12:34 AM',
  },
];

exports.signUp = async (userData) => {
  try {
    // SQL Query > Insert Data
    const { res } = await query(`INSERT INTO users(full_name, email, password) values('${userData.full_name}', '${userData.email}', '${userData.password}')`);
    return { status: 'success', message: res };
  } catch (error) {
    return { status: 'error', message: error };
  }
};

exports.login = async (email) => {
  try {
    // SQL Query > get Data
    return { status: 'success', data: await query(`SELECT * FROM users WHERE email = '${email}'`) };
  } catch (error) {
    return { status: 'error', message: error };
  }
};

exports.getAllEntry = async (userId) => {
  try {
    // SQL Query > get entry
    return { status: 'success', data: await query(`SELECT * FROM diary WHERE userid = '${userId}'`) };
  } catch (error) {
    return { status: 'error', message: error };
  }
};

exports.getEntry = async (info) => {
  try {
    // SQL Query > get entry
    return { status: 'success', data: await query(`SELECT * FROM diary WHERE userid = '${info.userId}' AND id = '${info.entry}'`) };
  } catch (error) {
    return { status: 'error', message: error };
  }
};
