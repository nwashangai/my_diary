'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _DiaryController = require('./controllers/DiaryController');

var _DiaryController2 = _interopRequireDefault(_DiaryController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _DiaryController2.default.getDiary);
router.get('/entries', _DiaryController2.default.getDiary);
router.get('/entries/:id', _DiaryController2.default.getDiary);
module.exports = router;