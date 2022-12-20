import express from 'express';

import { createBiz, getAllBiz } from '../controllers/biz.js';

const route = express.Router();

route.post('/', createBiz);
route.get('/', getAllBiz);

export default route;
