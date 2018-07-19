'use strict';

var _DiaryModel = require('../models/DiaryModel');

var _DiaryModel2 = _interopRequireDefault(_DiaryModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getDiary = function (request, response) {
  if (request.params.id) {
    response.status(200).json(_DiaryModel2.default.data[request.params.id] || { warning: 'No entry found' });
  } else {
    response.status(200).json(_DiaryModel2.default.data);
  }
};

exports.setDiary = function (request, response) {
  if (!request.body.subject || !request.body.diary || request.body.subject.trim() === '' || request.body.diary.trim() === '') {
    response.json({ message: 'sorry please provide all fields' });
  } else {
    var userID = Object.keys(_DiaryModel2.default).length + 1;
    var entry = request.body;
    entry.date = new Date();
    _DiaryModel2.default.data.userID = entry;
    response.json({ res: _DiaryModel2.default.data });
  }
};

exports.updateDiary = function (request, response) {
  var userID = request.params.id;
  if (_DiaryModel2.default.data.hasOwnProperty(userID)) {
    if (!request.body.subject || !request.body.diary || request.body.subject.trim() === '' || request.body.diary.trim() === '') {
      response.json({ warning: 'sorry please provide all fields' });
    } else {
      var entry = request.body;
      entry.date = new Date();
      _DiaryModel2.default.data.userID = request.body;
      response.json({ res: _DiaryModel2.default.data.userID });
    }
  } else {
    response.json({ error: 'sorry problem in saving data' });
  }
};