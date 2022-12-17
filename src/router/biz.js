import express from 'express';

import { createBiz } from '../controller/biz.js';

const route = express.Router();

route.post('/', createBiz);

export default route;
