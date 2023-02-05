import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { __dirname } from './utilities/index.js';

import bizRouter from './routes/biz.js';
import dataRouter from './routes/data.js';
import userRouter from './routes/user.js';
import termRouter from './routes/term.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static('src/public'));

app.use(`/${process.env.API_VERSION}/biz`, bizRouter);
app.use(`/${process.env.API_VERSION}/data`, dataRouter);
app.use(`/${process.env.API_VERSION}/user`, userRouter);
app.use(`/${process.env.API_VERSION}/term`, termRouter);

app.listen(process.env.PORT, () =>
  console.log('Server running on: http://localhost:' + process.env.PORT)
);
