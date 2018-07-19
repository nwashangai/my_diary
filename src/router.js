import express from 'express';
import DiaryController from './controllers/DiaryController';

const router = express.Router();

router.get('/', DiaryController.getDiary);
router.get('/entries', DiaryController.getDiary);
router.get('/entries/:id', DiaryController.getDiary);
module.exports = router;
