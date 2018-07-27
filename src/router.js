import express from 'express';
import jwt from 'jsonwebtoken';
import config from './config';
import DiaryController from './controllers/DiaryController';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(404);
  res.send({ error: '404 Sorry the page has not yet been defined try /api/v1/entries' });
});
router.post('/auth/signup', DiaryController.signUp);
router.post('/auth/login', DiaryController.login);

router.use((req, res, next) => {
  const token = req.body.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies key
    jwt.verify(token, config.SECRET, (err, decoded) => {
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

router.get('/entries', DiaryController.getDiary);
router.get('/entries/:id', DiaryController.getDiary);
router.post('/entries', DiaryController.setDiary);
router.put('/entries/:id', DiaryController.updateDiary);

module.exports = router;