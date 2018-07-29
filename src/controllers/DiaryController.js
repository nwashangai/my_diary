import passwordHash from 'password-hash';
import jwt from 'jsonwebtoken';
import config from '../config';
import DiaryModel from '../models/DiaryModel';

// search through an object
const search = (nameKey, obj) => {
  for (let i = 0; i < obj.length; i += 1) {
    if (obj[i].entryID === nameKey) {
      return obj[i];
    }
  }
  return false;
}

// update data
const update = (nameKey, obj, ent) => {
  for (let i = 0; i < obj.length; i += 1) {
    if (obj[i].entryID === nameKey) {
      DiaryModel.data[i].subject = ent.subject;
      DiaryModel.data[i].diary = ent.subject;
      DiaryModel.data[i].date = ent.subject;
      return true
    }
  }
  return false;
}

exports.signUp = (request, response) => {
  if (!request.body.full_name || !request.body.email || !request.body.password || request.body.full_name.trim() === '' || request.body.email.trim() === '' || request.body.password.trim() === '') {
    response.json({ status: 'error', message: 'sorry please provide all fields' });
  } else {
    const user = { full_name: request.body.full_name, email: request.body.email, password: passwordHash.generate(request.body.password) };
    DiaryModel.login(request.body.email).then((done) => {
      if (done.data.rows.length > 0) {
        response.status(200).json({ status: 'error', message: 'duplicate email address' });
      } else {
        DiaryModel.signUp(user).then((res) => {
          if (res.status === 'success') {
            response.status(200).json({ status: 'success', message: 'Signup successful' });
          } else {
            response.status(406).json({ status: 'error', message: res });
          }
        });
      }
    });
  }
};

exports.login = (request, response) => {
  if (!request.body.email || !request.body.password || request.body.email.trim() === '' || request.body.password.trim() === '') {
    response.json({ status: 'error', message: 'sorry please provide all fields' });
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
          response.status(406).json({ status: 'error', message: 'invalid user' });
        }
      } else {
        response.status(401).json({ status: 'error', message: res.status });
      }
    });
  }
}

exports.getDiary = (request, response) => {
  if (request.params.id) {
    DiaryModel.getEntry({ userId: request.decoded.userID, entry: request.params.id }).then((res, err) => {
      if (err) {
        response.status(501).json({ status: 'error', entry: err });
      }
      if (res.data.rows.length === 1) {
        response.status(200).json({ status: 'success', entry: res.data.rows });
      } else {
        response.status(200).json({ status: 'error', message: 'No entry found' });
      }
    });
  } else {
    DiaryModel.getAllEntry(request.decoded.userID).then((res, err) => {
      if (err) {
        response.status(501).json({ status: 'error', entries: err });
      }
      response.status(200).json({ status: 'success', entries: res.data.rows });
    });
  }
}

exports.setDiary = (request, response) => {
  if (!request.body.subject || !request.body.diary || request.body.subject.trim() === '' || request.body.diary.trim() === '') {
    response.status(406).json({ status: 'error', message: 'sorry please provide all fields' });
  } else {
    const userData = { userId: request.decoded.userID, subject: request.body.subject, diary: request.body.diary };
    DiaryModel.addEntry(userData).then((res) => {
      if (res.status === 'success') {
        response.status(200).json({ status: 'success', message: 'Entry saved successfully' });
      } else {
        response.status(406).json({ status: 'error', message: res });
      }
    });
  }
}

exports.updateDiary = (request, response) => {
  if (!request.body.subject || !request.body.diary || request.body.subject.trim() === '' || request.body.diary.trim() === '') {
    response.status(406).json({ status: 'error', message: 'provide all fields' });
  } else {
    const userData = { userId: request.decoded.userID, entry: request.params.id, subject: request.body.subject, diary: request.body.diary };
    DiaryModel.getEntry(userData).then((done, err) => {
      if (err) {
        response.status(501).json({ status: 'error', entries: err });
      }
      if (done.data.rows.length !== 1) {
        response.status(501).json({ status: 'error', message: 'invalid entry Id' });
      } else {
        DiaryModel.updateDiary(userData).then((res, err) => {
          if (err) {
            response.status(501).json({ status: 'error', entries: err });
          }
          if (res.status === 'success') {
            response.status(200).json({ status: 'success', message: 'update successful' });
          } else {
            response.status(406).json({ status: 'error', message: res });
          }
        });
      }
    }); //
  }
}
