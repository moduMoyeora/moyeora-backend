"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
// 환경 변수 로드
dotenv_1.default.config();
const app = (0, express_1.default)();
// JSON 요청을 처리하기 위해 미들웨어 추가
app.use(express_1.default.json());
app.use("/users", userRoute_1.default);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
