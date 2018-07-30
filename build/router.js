'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _DiaryController = require('./controllers/DiaryController');

var _DiaryController2 = _interopRequireDefault(_DiaryController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
  res.status(404);
  res.send({ error: '404 Sorry the page has not yet been defined try /api/v1/entries' });
});
router.post('/auth/signup', _DiaryController2.default.signUp);
router.post('/auth/login', _DiaryController2.default.login);

router.use(function (req, res, next) {
  var token = req.body.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies key
    _jsonwebtoken2.default.verify(token, _config2.default.development.SECRET, function (err, decoded) {
      if (err) {
        return res.json({ status: 'error', message: 'authentication failed' });
      }
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
    });
  } else {
    // no token?
    return res.status(403).send({ status: 'error', message: 'No token provided.' });
  }
});

router.get('/entries', _DiaryController2.default.getDiary);
router.get('/entries/:id', _DiaryController2.default.getDiary);
router.post('/entries', _DiaryController2.default.setDiary);
router.put('/entries/:id', _DiaryController2.default.updateDiary);

module.exports = router;