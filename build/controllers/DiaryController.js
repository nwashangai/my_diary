'use strict';

var _passwordHash = require('password-hash');

var _passwordHash2 = _interopRequireDefault(_passwordHash);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _DiaryModel = require('../models/DiaryModel');

var _DiaryModel2 = _interopRequireDefault(_DiaryModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// search through an object
var search = function search(nameKey, obj) {
  for (var i = 0; i < obj.length; i += 1) {
    if (obj[i].entryID === nameKey) {
      return obj[i];
    }
  }
  return false;
};

// update data
var update = function update(nameKey, obj, ent) {
  for (var i = 0; i < obj.length; i += 1) {
    if (obj[i].entryID === nameKey) {
      _DiaryModel2.default.data[i].subject = ent.subject;
      _DiaryModel2.default.data[i].diary = ent.subject;
      _DiaryModel2.default.data[i].date = ent.subject;
      return true;
    }
  }
  return false;
};

exports.signUp = function (request, response) {
  if (!request.body.full_name || !request.body.email || !request.body.password || request.body.full_name.trim() === '' || request.body.email.trim() === '' || request.body.password.trim() === '') {
    response.json({ status: 'error', message: 'sorry please provide all fields' });
  } else {
    var user = { full_name: request.body.full_name, email: request.body.email, password: _passwordHash2.default.generate(request.body.password) };
    _DiaryModel2.default.login(request.body.email).then(function (done) {
      if (done.data.rows.length > 0) {
        response.status(200).json({ status: 'error', message: 'duplicate email address' });
      } else {
        _DiaryModel2.default.signUp(user).then(function (res) {
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

exports.login = function (request, response) {
  if (!request.body.email || !request.body.password || request.body.email.trim() === '' || request.body.password.trim() === '') {
    response.json({ status: 'error', message: 'sorry please provide all fields' });
  } else {
    _DiaryModel2.default.login(request.body.email).then(function (res) {
      if (res.status === 'success') {
        var isValid = res.data.rows.length === 1 ? _passwordHash2.default.verify(request.body.password, res.data.rows[0].password) : false;
        if (isValid) {
          var payload = {
            userID: res.data.rows[0].id
          };
          var tok = _jsonwebtoken2.default.sign(payload, _config2.default.SECRET);
          response.status(200).json({ status: 'success', message: 'login successful', token: tok });
        } else {
          response.status(406).json({ status: 'error', message: 'invalid user' });
        }
      } else {
        response.status(401).json({ status: 'error', message: res.status });
      }
    });
  }
};

exports.getDiary = function (request, response) {
  if (request.params.id) {
    _DiaryModel2.default.getEntry({ userId: request.decoded.userID, entry: request.params.id }).then(function (res, err) {
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
    _DiaryModel2.default.getAllEntry(request.decoded.userID).then(function (res, err) {
      if (err) {
        response.status(501).json({ status: 'error', entries: err });
      }
      response.status(200).json({ status: 'success', entries: res.data.rows });
    });
  }
};

exports.setDiary = function (request, response) {
  if (!request.body.subject || !request.body.diary || request.body.subject.trim() === '' || request.body.diary.trim() === '') {
    response.status(406).json({ status: 'error', message: 'sorry please provide all fields' });
  } else {
    var userData = { userId: request.decoded.userID, subject: request.body.subject, diary: request.body.diary };
    _DiaryModel2.default.addEntry(userData).then(function (res) {
      if (res.status === 'success') {
        response.status(200).json({ status: 'success', message: 'Entry saved successfully' });
      } else {
        response.status(406).json({ status: 'error', message: res });
      }
    });
  }
};

exports.updateDiary = function (request, response) {
  if (!request.body.subject || !request.body.diary || request.body.subject.trim() === '' || request.body.diary.trim() === '') {
    response.status(406).json({ status: 'error', message: 'provide all fields' });
  } else {
    var userData = { userId: request.decoded.userID, entry: request.params.id, subject: request.body.subject, diary: request.body.diary };
    _DiaryModel2.default.getEntry(userData).then(function (done, err) {
      if (err) {
        response.status(501).json({ status: 'error', entries: err });
      }
      if (done.data.rows.length !== 1) {
        response.status(501).json({ status: 'error', message: 'invalid entry Id' });
      } else {
        _DiaryModel2.default.updateDiary(userData).then(function (res, err) {
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
};