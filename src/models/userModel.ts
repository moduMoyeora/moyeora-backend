import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../config/db';
import {
  LoginResult,
  Profile,
  profileResult,
  User,
} from '../types/interface/userInterface';
import { InternalServerError } from '../errors/httpError';

export const join = async (
  email: string,
  password: string,
  nickname: string
): Promise<User> => {
  try {
    let query = `INSERT INTO member (email, password, nickname) VALUES (?,?,?)`;
    const [result] = await pool.query<ResultSetHeader>(query, [
      email,
      password,
      nickname,
    ]);

    query = `SELECT * FROM member WHERE id = ?`;
    const [user] = await pool.query<User[]>(query, [result.insertId]);

    return user[0];
  } catch {
    throw new InternalServerError('데이터베이스 접근 중 오류가 발생했습니다.');
  }
};

export const checkDuplicate = async (
  field: 'email' | 'nickname',
  value: string
): Promise<boolean> => {
  try {
    const query = `SELECT COUNT(*) AS count FROM member WHERE ${field} = ?`;
    const [rows] = await pool.query<RowDataPacket[]>(query, [value]);
    const result = rows[0] as { count: number };

    return result.count > 0;
  } catch {
    throw new InternalServerError('데이터베이스 접근 중 오류가 발생했습니다.');
  }
};

export const login = async (email: string): Promise<LoginResult | null> => {
  try {
    const query = `SELECT * FROM member WHERE email = ?`;
    const [result] = await pool.query<LoginResult[]>(query, [email]);

    if (result.length === 0) {
      return null;
    }

    const user = result[0];
    return user;
  } catch {
    throw new InternalServerError('데이터베이스 접근 중 오류가 발생했습니다.');
  }
};

export const viewProfile = async (
  userId: number
): Promise<profileResult | null> => {
  try {
    const query = `SELECT nickname,name,gender,region,age,description 
      FROM member WHERE id = ?;`;
    const [result] = await pool.query<profileResult[]>(query, [userId]);

    if (result.length === 0) {
      return null;
    }
    const profile = result[0];
    return profile;
  } catch {
    throw new InternalServerError('데이터베이스 접근 중 오류가 발생했습니다.');
  }
};

export const editProfile = async (userId: number, updateData: Profile) => {
  try {
    const query = `UPDATE member
    SET nickname = ?, name = ?, gender = ?, region = ?, age = ?, description = ?
    WHERE id = ?`;
    const values = [...Object.values(updateData), userId];
    await pool.query<ResultSetHeader>(query, values);
  } catch {
    throw new InternalServerError('데이터베이스 접근 중 오류가 발생했습니다.');
  }
};
