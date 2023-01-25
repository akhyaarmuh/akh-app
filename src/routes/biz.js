import express from 'express';

import { createBiz } from '../controllers/biz.js';

const router = express.Router();

router.post('/', createBiz);

export default router;
