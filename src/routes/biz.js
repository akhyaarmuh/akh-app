import express from 'express';
import { verifyToken } from '../middleware/index.js';
import {
  createBiz,
  getAllBiz,
  getBizById,
  deactiveBizById,
  updateBizById,
  deleteBizById,
} from '../controllers/biz.js';

const router = express.Router();

router.post('/', verifyToken, createBiz);
router.post('/register-biz', verifyToken, createBiz);
router.get('/', verifyToken, getAllBiz);
router.get('/:id', verifyToken, getBizById);
router.patch('/deactive/:id', verifyToken, deactiveBizById);
router.patch('/:id', verifyToken, updateBizById);
router.delete('/:id', verifyToken, deleteBizById);

export default router;
