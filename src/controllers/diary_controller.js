import passwordHash from 'password-hash';
import jwt from 'jsonwebtoken';
import config from '../config';
import validate from '../helpers/validator';
import DiaryModel from '../models/diary_model';

/**
 * User SignUp
 * @method
 * @argument {object} request - Http request object
 * @argument {object} response - Http response object
 */
exports.signUp = (request, response) => {
  if (!validate.isValidSignUp(request.body)) {
    response.status(400).json({ status: 'error', message: 'sorry please provide all fields' });
  } else {
    const user = { full_name: request.body.full_name, email: request.body.email, password: passwordHash.generate(request.body.password) };
    DiaryModel.login(request.body.email).then((done) => {
      if (done.data.rows.length > 0) {
        response.status(409).json({ status: 'error', message: 'duplicate email address' });
      } else {
        DiaryModel.signUp(user).then((res) => {
          if (res.status === 'success') {
            response.status(200).json({ status: 'success', message: 'Signup successful', entry: res.message.rows[0] });
          } else {
            response.json({ status: 'error', message: res });
          }
        });
      }
    }).catch((err) => {
      response.status(500).json({ status: 'error', message: err });
    });
  }
};

/**
 * User Signin
 * @method
 * @argument {object} request - Http request object
 * @argument {object} response - Http response object
 */
exports.login = (request, response) => {
  if (!validate.isValidLogin(request.body)) {
    response.status(400).json({ status: 'error', message: 'sorry please provide all fields' });
  } else {
    DiaryModel.login(request.body.email).then((res) => {
      if (res.status === 'success') {
        const isValid = (res.data.rows.length === 1) ? passwordHash.verify(request.body.password, res.data.rows[0].password) : false;
        if (isValid) {
          const payload = {
            userID: res.data.rows[0].id,
          };
          const tok = jwt.sign(payload, config.development.SECRET);
          response.status(200).json({ status: 'success', message: 'login successful', token: tok });
        } else {
          response.status(403).json({ status: 'error', message: 'invalid credentials' });
        }
      } else {
        response.status(401).json({ status: 'error', message: res.status });
      }
    }).catch((err) => {
      response.status(500).json({ status: 'error', message: err });
    });
  }
}

/**
 * Fectch user entries
 * @method
 * @argument {object} request - Http request object
 * @argument {object} response - Http response object
 */
exports.getDiary = (request, response) => {
  if (request.params.id) {
    DiaryModel.getEntry({ userId: request.decoded.userID, entry: request.params.id }).then((res) => {
      if (res.rows.length === 1) {
        response.status(200).json({ status: 'success', entry: res.rows });
      } else {
        response.status(404).json({ status: 'error', message: 'No entry found' });
      }
    }).catch((err) => {
      response.status(500).json({ status: 'error', message: err });
    });
  } else {
    DiaryModel.getAllEntry(request.decoded.userID).then((res) => {
      response.status(200).json({ status: 'success', entries: res.rows });
    }).catch((err) => {
      response.status(500).json({ status: 'error', message: err });
    });
  }
}

/**
 * Stores user entry
 * @method
 * @argument {object} request - Http request object
 * @argument {object} response - Http response object
 */
exports.setDiary = (request, response) => {
  if (!validate.isValidEntry(request.body)) {
    response.status(400).json({ status: 'error', message: 'please provide all fields' });
  } else {
    const userData = { userId: request.decoded.userID, subject: request.body.subject, diary: request.body.diary };
    DiaryModel.addEntry(userData).then((res) => {
      if (res.status === 'success') {
        response.status(200).json({ status: 'success', message: 'Entry saved successfully', entry: res.message.rows[0] });
      } else {
        response.status(500).json({ status: 'error', message: 'Server error' });
      }
    }).catch((err) => {
      response.status(500).json({ status: 'error', message: 'Server error1' });
    });
  }
}

/**
 * Update user entry
 * @method
 * @argument {object} request - Http request object
 * @argument {object} response - Http response object
 */
exports.updateDiary = (request, response) => {
  if (!validate.isValidEntry(request.body)) {
    response.status(400).json({ status: 'error', message: 'provide all fields' });
  } else {
    const userData = { userId: request.decoded.userID, entry: request.params.id, subject: request.body.subject, diary: request.body.diary };
    DiaryModel.getEntry({ userId: request.decoded.userID, entry: request.params.id }).then((res) => {
      if (res.rows.length < 1) {
        response.status(404).json({ status: 'error', message: 'Invalid Id' });
      } else {
        DiaryModel.getTimedEntry(userData).then((done) => {
          if (done.data.rows.length !== 1) {
            response.status(400).json({ status: 'error', message: 'It\'s too late to update this' });
          } else {
            DiaryModel.updateDiary(userData).then((res) => {
              response.status(200).json({ status: 'success', message: 'update successful', entry: res.rows });
            }).catch((err) => {
              response.status(500).json({ status: 'error', message: 'Internal server error2' });
            });
          }
        }).catch((err) => {
          response.status(500).json({ status: 'error', message: 'Internal server error1' });
        });
      }
    }).catch((err) => {
      response.status(500).json({ status: 'error', message: err });
    });
  }
}
