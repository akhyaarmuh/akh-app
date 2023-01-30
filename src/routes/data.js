import express from 'express';
import {
  createData,
  createMedia,
  getAllData,
  getDataById,
  updateMediaById,
  updateDataById,
  deleteDataById,
} from '../controllers/data.js';

const router = express.Router();

router.post('/', createData);
router.post('/media', createMedia);
router.get('/', getAllData);
router.get('/:id', getDataById);
router.patch('/media/:id', updateMediaById);
router.patch('/:id', updateDataById);
router.delete('/:id', deleteDataById);

export default router;
