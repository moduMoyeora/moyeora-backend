import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../config/db';
import { User } from '../types/interface/userInterface';



export const join = async (
  email: string,
  password: string,
  nickname: string
) => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO member (email, password, nickname) VALUES (?,?,?)`,
    [email, password, nickname]
  );
  console.log(result);

  const [users] = await pool.query<ResultSetHeader>(
    `SELECT * FROM member WHERE id = ?`,
    [result.insertId]
  );
  console.log(users);

  return users;
};

export const checkEmail = async (email: string) => {
  const [user] = await pool.query<User[]>(
      `SELECT * FROM member WHERE email = ?`,
      [email]
    );
  
  if(user.length === 0){
    return null;
  } 

  return user;
};

export const checkNickname = async (nickname: string) => {
  const [user] = await pool.query<User[]>(
      `SELECT * FROM member WHERE nickname = ?`,
      [nickname]
    );
  
  if(user.length === 0){
    return null;
  } 

  return user;
};

export const login = async (email: string) => {
        const [user] = await pool.query<User[]>(
            `SELECT * FROM member WHERE email = ?`,
            [email]
          );
        
        if(user.length === 0){
          return null;
        } 

        return user;
};
