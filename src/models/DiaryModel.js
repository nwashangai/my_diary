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
 * Stores user entry
 * @method
 * @param {String} data - query data
 * @link reference to https://gist.github.com/zerbfra/70b155fa00b4e0d6fd1d4e090a039ad4
 */
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

/**
 * Save user account information
 * @method
 * @argument {object} userdata - account information
 */
exports.signUp = async (userData) => {
  try {
    const { res } = await query(`INSERT INTO users(full_name, email, password) values('${userData.full_name}', '${userData.email}', '${userData.password}')`);
    return { status: 'success', message: res };
  } catch (error) {
    return { status: 'error', message: error };
  }
};

/**
 * Get user account information
 * @method
 * @argument {String} email - user email address
 */
exports.login = async (email) => {
  try {
    return { status: 'success', data: await query(`SELECT * FROM users WHERE email = '${email}'`) };
  } catch (error) {
    return { status: 'error', message: error };
  }
};

/**
 * Get all user entries
 * @method
 * @argument {String} userId - user ID
 */
exports.getAllEntry = async (userId) => {
  try {
    return { status: 'success', data: await query(`SELECT * FROM diary WHERE userid = '${userId}'`) };
  } catch (error) {
    return { status: 'error', message: error };
  }
};

/**
 * Get a specific user entry data
 * @method
 * @argument {object} userdata - user entry information
 */
exports.getEntry = async (info) => {
  try {
    return { status: 'success', data: await query(`SELECT * FROM diary WHERE userid = '${info.userId}' AND id = '${info.entry}'`) };
  } catch (error) {
    return { status: 'error', message: error };
  }
};

/**
 * Get a specific user entry data within 24 hrs
 * @method
 * @argument {object} userdata - user entry information
 */
exports.getTimedEntry = async (info) => {
  try {
    return {
      status: 'success', data: await query(`SELECT * FROM diary WHERE userid = '${info.userId}' AND id = '${info.entry}' AND (DATE_PART('day', 'NOW()'::timestamp - date::timestamp) * 24 + 
              DATE_PART('hour', 'NOW()'::timestamp - date::timestamp)) < 24`),
    };
  } catch (error) {
    return { status: 'error', message: error };
  }
};

/**
 * Save user entry
 * @method
 * @argument {object} userdata - entry data
 */
exports.addEntry = async (userData) => {
  try {
    const { res } = await query(`INSERT INTO diary(userid, subject, diary) values('${userData.userId}', '${userData.subject}', '${userData.diary}')`);
    return { status: 'success', message: res };
  } catch (error) {
    return { status: 'error', message: error };
  }
};

/**
 * Update user entry data
 * @method
 * @argument {object} userdata - new entry data
 */
exports.updateDiary = async (userData) => {
  try {
    const { res } = await query(`UPDATE diary SET subject = '${userData.subject}', diary = '${userData.diary}' WHERE id = '${userData.entry}' AND userid = '${userData.userId}'`);
    return { status: 'success', message: res };
  } catch (error) {
    return { status: 'error', message: error };
  }
};
