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