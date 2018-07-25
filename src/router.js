import express from 'express';
import DiaryController from './controllers/DiaryController';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(404);
  res.send({ error: '404 Sorry the page has not yet been defined try /api/v1/entries' });
});
router.get('/entries', DiaryController.getDiary);
router.get('/entries/:id', DiaryController.getDiary);
router.post('/entries', DiaryController.setDiary);
router.put('/entries/:id', DiaryController.updateDiary);

module.exports = router;
