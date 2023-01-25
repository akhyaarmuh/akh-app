import 'dotenv/config';
import express from 'express';

import { login } from './controllers/auth.js';

const app = express();

app.use(express.json());

// auth
app.post(`/${process.env.API_VERSION}/login`, login);

app.use(`/${process.env.API_VERSION}/data`);

app.listen(process.env.PORT, () =>
  console.log('Server running on: http://localhost:' + process.env.PORT)
);