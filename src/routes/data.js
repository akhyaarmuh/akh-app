import express from 'express';
import { createData, createMedia, getAllData } from '../controllers/data.js';

const router = express.Router();

router.post('/', createData);
router.post('/media', createMedia);
router.get('/', getAllData);

export default router;
