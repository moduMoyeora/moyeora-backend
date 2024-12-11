import { RowDataPacket } from 'mysql2';

export interface TotalCountResult extends RowDataPacket {
    totalCount: number;
}
export interface CheckBoardExists extends RowDataPacket {
    exists: number;
}
  
export interface Board extends RowDataPacket {
    id: number;
    name: string;
    description: string;
    created_at: Date;
}

export interface Post extends RowDataPacket {
    id: number;
    member_id: number;
    board_id: number;
    title: string;
    content: string;
    created_at: Date;
    updated_at: Date;
}

export interface Member extends RowDataPacket{
    id: number;
    email: string;
    password: string;
    nickname: string;
    created_at: Date;
    updated_at: Date;
}