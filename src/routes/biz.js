import express from 'express';

import { createBiz, getAllBiz, getBizById, deleteBizById } from '../controllers/biz.js';

const router = express.Router();

router.post('/', createBiz);
router.get('/', getAllBiz);
router.get('/:id', getBizById);
router.delete('/:id', deleteBizById);

export default router;
