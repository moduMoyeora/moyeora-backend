import express from 'express';
import postRouter from './routes/postRouter';
import boardRouter from './routes/boardRouter';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/posts', postRouter);
app.use('/boards', boardRouter);

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
