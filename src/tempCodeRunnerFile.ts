import express from "express";
import dotenv from "dotenv";
import postRoute from "./routes/postRoute";

// 환경 변수 로드
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// JSON 요청을 처리하기 위해 미들웨어 추가
app.use(express.json());

app.use("/boards/:board_id/posts", postRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
