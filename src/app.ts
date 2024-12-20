import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute';
import postRoute from './routes/postRoute';
import eventRoute from './routes/eventRoute';
import commentRoute from './routes/commentRoute';
import { errorHandler } from './middlewares/errorMiddleware';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: '*',
    allowedHeaders: '*',
    credentials: true,
  })
);

app.use('/users', userRoute);
app.use('/boards/:boardId/posts', postRoute);
app.use('/boards/:boardId/posts/:postId/events', eventRoute);
app.use('/boards/:boardId/posts/:postId/comments', commentRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
