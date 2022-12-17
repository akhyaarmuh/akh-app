import 'dotenv/config';
import express from 'express';

import bizRouter from './router/biz.js';

const app = express();

app.use(express.json());

app.use('/register-biz', bizRouter);

app.listen(process.env.PORT, () =>
  console.log('Server running on: http://localhost:' + process.env.PORT)
);
