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

export interface check_duplicate {
  field: 'email' | 'nickname';
  value: string;
}
