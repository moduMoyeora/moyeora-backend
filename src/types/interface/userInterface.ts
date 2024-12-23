import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';

export interface User extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  nickname: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResult extends RowDataPacket {
  id: number;
  email: string;
  password: string;
}

export interface Profile {
  nickname: string;
  name: string;
  gender: 'M' | 'F';
  region: string;
  age: number;
  description: string;
}

export interface profileResult extends RowDataPacket, Profile {}

export interface UserPayload extends JwtPayload {
  id: number;
}

export interface JwtRequest extends Request {
  user?: UserPayload;
}
