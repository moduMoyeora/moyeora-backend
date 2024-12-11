import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute";

// 환경 변수 로드
dotenv.config();

const app = express();

// JSON 요청을 처리하기 위해 미들웨어 추가
app.use(express.json());

app.use("/users", userRoute);

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
