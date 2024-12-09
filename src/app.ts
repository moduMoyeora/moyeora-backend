import express from 'express';
import postRouter from './routes/postRouter';
import boardRouter from './routes/boardRouter';

const app = express();

import dotenv from 'dotenv';
dotenv.config();

app.use(express.json());

app.use('/posts', postRouter);
app.use('/boards', boardRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
