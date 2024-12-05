import express from "express";
import dotenv from "dotenv";
import testRoute from "./routes/testRoute";

// 환경 변수 로드
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// JSON 요청을 처리하기 위해 미들웨어 추가
app.use(express.json());

// 테스트용 라우트 추가
app.use("/api", testRoute);

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Helloo, this is the backend API!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
