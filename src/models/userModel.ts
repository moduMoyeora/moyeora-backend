import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../config/db';
import { LoginResult, User } from '../types/interface/userInterface';

export const join = async (
  email: string,
  password: string,
  nickname: string
): Promise<User> => {
  try{
    let query = `INSERT INTO member (email, password, nickname) VALUES (?,?,?)`
    const [result] = await pool.query<ResultSetHeader>(query,[email, password, nickname]);
  
    query = `SELECT * FROM member WHERE id = ?`
    const [user] = await pool.query<User[]>(query, [result.insertId]);

    return user[0];
  }catch(error){
    console.error("DB 쿼리 실패 :", error);
    throw new Error("DB 에러");
  }
};

export const checkDuplicate = async (
  field: 'email' | 'nickname',
  value: string
): Promise<boolean> => {
  try{
    const query = `SELECT COUNT(*) AS count FROM member WHERE ${field} = ?`;
    const [rows] = await pool.query<RowDataPacket[]>(query, [value]);
    const result = rows[0] as {count : number};
  
    return result.count > 0;  
  } catch(error){
    console.error("DB 쿼리 실패 :", error);
    throw new Error("DB 에러");
  }
};

export const login = async (email: string): Promise<LoginResult | null> => {
  try{
    const query = `SELECT * FROM member WHERE email = ?`
    const [result] = await pool.query<LoginResult[]>(query,[email]);  
    
    if (result.length === 0) {
      return null;
    }

    const user = result[0];
    return user;
  } catch(error){
    console.error("DB 쿼리 실패 :", error);
    throw new Error("DB 에러");
  }
};
