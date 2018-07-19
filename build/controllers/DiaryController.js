'use strict';

var _DiaryModel = require('../models/DiaryModel');

var _DiaryModel2 = _interopRequireDefault(_DiaryModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getDiary = function (request, response) {
  if (request.params.id) {
    response.status(200).json(_DiaryModel2.default.data[request.params.id] || { warning: 'no diary found' });
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