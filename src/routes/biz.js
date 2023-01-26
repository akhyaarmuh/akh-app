import express from 'express';

import {
  createBiz,
  getAllBiz,
  getBizById,
  deactiveBizById,
  updateBizById,
  deleteBizById,
} from '../controllers/biz.js';

const router = express.Router();

router.post('/', createBiz);
router.get('/', getAllBiz);
router.get('/:id', getBizById);
router.patch('/deactive/:id', deactiveBizById);
router.patch('/:id', updateBizById);
router.delete('/:id', deleteBizById);

export default router;
