'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _DiaryController = require('./controllers/DiaryController');

var _DiaryController2 = _interopRequireDefault(_DiaryController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
  res.status(404);
  res.send({ error: '404 Sorry the page has not yet been defined try /api/v1/entries' });
});
router.get('/entries', _DiaryController2.default.getDiary);
router.get('/entries/:id', _DiaryController2.default.getDiary);
router.post('/entries', _DiaryController2.default.setDiary);
router.put('/entries/:id', _DiaryController2.default.updateDiary);

module.exports = router;