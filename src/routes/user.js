import express from 'express';
import { verifyToken } from '../middleware/index.js';
import {
  createUser,
  login,
  getAllUser,
  getUserById,
  deactiveUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/user.js';

const router = express.Router();

router.post('/', createUser);
router.post('/register', createUser);
router.post('/login', login);
router.get('/', verifyToken, getAllUser);
router.get('/:id', verifyToken, getUserById);
router.patch('/deactive/:id', verifyToken, deactiveUserById);
router.patch('/:id', verifyToken, updateUserById);
router.delete('/:id', verifyToken, deleteUserById);

export default router;
