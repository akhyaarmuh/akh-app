import express from 'express';
import {
  createUser,
  getAllUser,
  getUserById,
  deactiveUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/user.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUser);
router.get('/:id', getUserById);
router.patch('/deactive/:id', deactiveUserById);
router.patch('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;
