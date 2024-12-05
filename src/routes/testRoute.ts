import express from "express";
import connection from "../config/db";

const router = express.Router();

router.get("/test", (req, res) => {
  // MySQL 쿼리로 테스트 데이터를 조회
  connection.query("SELECT * FROM test_table LIMIT 1", (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.status(500).json({ error: "Database query error" });
    }
    res.json({ message: "Database connection successful!", data: results });
  });
});

export default router;
