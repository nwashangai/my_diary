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
    const { res } = await query(`INSERT INTO users(full_name, email, password) values('${userData.full_name}', '${userData.email}', '${userData.password}') RETURNING *`);
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
exports.login = (email) => {
  return query(`SELECT * FROM users WHERE email = '${email}'`);
};

/**
 * Get all user entries
 * @method
 * @argument {String} userId - user ID
 */
exports.getAllEntry = (userId) => {
  return query(`SELECT * FROM diary WHERE userid::int8 = ${userId}::int8`);
};

/**
 * Get a specific user entry data
 * @method
 * @argument {object} userdata - user entry information
 */
exports.getEntry = (info) => {
  return query(`SELECT * FROM diary WHERE userid = '${info.userId}' AND id = '${info.entry}'`);
};

/**
 * Get a specific user entry data within 24 hrs
 * @method
 * @argument {object} userdata - user entry information
 */
exports.getTimedEntry = async (info) => {
  return query(`SELECT * FROM diary WHERE userid = '${info.userId}' AND id = '${info.entry}' AND (DATE_PART('day', 'NOW()'::timestamp - date::timestamp) * 24 + 
              DATE_PART('hour', 'NOW()'::timestamp - date::timestamp)) < 24`);
};

/**
 * Save user entry
 * @method
 * @argument {object} userdata - entry data
 */
exports.addEntry = (userData) => {
  return query(`INSERT INTO diary(userid, subject, diary) values('${userData.userId}', '${userData.subject}', '${userData.diary}') RETURNING *`);
};

/**
 * Update user entry data
 * @method
 * @argument {object} userdata - new entry data
 */
exports.updateDiary = (userData) => {
  return query(`UPDATE diary SET subject = '${userData.subject}', diary = '${userData.diary}' WHERE (id = '${userData.entry}' AND userid = '${userData.userId}') RETURNING *`);
};

/**
 * Get user reminders
 * @method
 * @argument {object} userId - entry data
 */
exports.getReminders = (userId) => {
  return query(`SELECT * FROM reminder WHERE userid = '${userId}'`);
};

/**
 * Save user reminder entry
 * @method
 * @argument {object} userdata - reminder data
 */
exports.addEReminder = (userData) => {
  return query(`INSERT INTO reminder(userid, description, date) values('${userData.userId}', '${userData.description}', '${userData.date}') RETURNING *`);
};
/**
 * Update user information
 * @method
 * @argument {object} userdata - bio data
 */
exports.updateBio = (userData) => {
  return query(`UPDATE users SET bio = '${userData.bio}' WHERE id = '${userData.userId}' RETURNING *`);
};

/**
 * Get total entry
 * @method
 * @argument {object} userId - user id
 */
exports.getTotal = (userId) => {
  return query(`SELECT COUNT(*) AS total FROM diary WHERE userid = '${userId}'`);
};

/**
 * Delete entry
 * @method
 * @argument {object} userData - delete item data
 */
exports.delete = (userData) => {
  return query(`DELETE FROM diary WHERE userid = '${userData.userId}' AND id = '${userData.entry}'`)
};
