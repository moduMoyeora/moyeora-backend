import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute';
import postRoute from './routes/postRoute';
import { errorHandler } from './middlewares/errorMiddleware';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use('/users', userRoute);
app.use('/boards/:boardId/posts', postRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
