import 'dotenv/config';
import express from 'express';

import bizRouter from './routes/biz.js';
import userRouter from './routes/user.js';

const app = express();

app.use(express.json());

app.use(`/${process.env.API_VERSION}/biz`, bizRouter);
app.use(`/${process.env.API_VERSION}/user`, userRouter);

app.listen(process.env.PORT, () =>
  console.log('Server running on: http://localhost:' + process.env.PORT)
);
