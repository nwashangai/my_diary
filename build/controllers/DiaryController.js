'use strict';

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

exports.getDiary = function (request, response) {
  if (request.params.id) {
    var data = search(request.params.id, _DiaryModel2.default.data);
    if (data) {
      response.status(200).json({ status: 'success', entry: data });
    } else {
      response.status(200).json({ status: 'error', message: 'No entry found' });
    }
  } else {
    response.status(200).json({ status: 'success', entries: _DiaryModel2.default.data });
  }
};

exports.setDiary = function (request, response) {
  if (!request.body.subject || !request.body.diary || request.body.subject.trim() === '' || request.body.diary.trim() === '') {
    response.json({ status: 'error', message: 'sorry please provide all fields' });
  } else {
    var userID = _DiaryModel2.default.data.length + 1;
    var entry = request.body;
    entry.entryID = userID;
    entry.date = new Date();
    _DiaryModel2.default.data.push(entry);
    response.json({ status: 'success', entry: search(userID, _DiaryModel2.default.data) });
  }
};

exports.updateDiary = function (request, response) {
  var userID = request.params.id;
  if (search(userID, _DiaryModel2.default.data) !== undefined) {
    if (!request.body.subject || !request.body.diary || request.body.subject.trim() === '' || request.body.diary.trim() === '') {
      response.json({ status: 'error', message: 'provide all fields' });
    } else {
      var entry = request.body;
      entry.date = new Date();
      var done = update(userID, _DiaryModel2.default.data, entry);
      if (done) {
        response.json({ status: 'success', entry: _DiaryModel2.default.data[userID] });
      } else {
        response.json({ status: 'error', message: 'no data was saved' });
      }
    }
  } else {
    response.json({ status: 'error', message: 'problem in saving data' });
  }
};