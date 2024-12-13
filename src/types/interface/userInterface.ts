import { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface User extends RowDataPacket {
    id: number;
    email: string;
    password: string;
    nickname: string;
    created_at: string;
    updated_at: string;
  }