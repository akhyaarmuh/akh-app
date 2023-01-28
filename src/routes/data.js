import express from 'express';
import { createData, getAllData } from '../controllers/data.js';

const router = express.Router();

router.post('/', createData);
router.get('/', getAllData);

export default router;
