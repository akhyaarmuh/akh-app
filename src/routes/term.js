import express from 'express';
import { createTerm, getAllTerm } from '../controllers/term.js';

const router = express.Router();

router.post('/', createTerm);
router.get('/', getAllTerm);

export default router;
