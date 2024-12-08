import express from 'express';
import postRoutes from './routes/post';

const app = express();

import dotenv from 'dotenv';
dotenv.config();

app.use(express.json());

// 라우트 연결
app.use('/posts', postRoutes);

// 서버 실행
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
