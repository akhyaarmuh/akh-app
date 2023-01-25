import express from 'express';

import { createBiz, getAllBiz } from '../controllers/biz.js';

const router = express.Router();

router.post('/', createBiz);
router.get('/', getAllBiz);

export default router;
