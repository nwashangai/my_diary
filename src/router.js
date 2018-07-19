import express from 'express';
import DiaryController from './controllers/DiaryController';

const router = express.Router();

router.get('/', DiaryController.getDiary);
router.get('/entries', DiaryController.getDiary);
module.exports = router;
