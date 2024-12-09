import { RowDataPacket } from 'mysql2';



export interface Board {
    id: number;
    name: string;
    description: string;
    created_at: Date;
}
  
export interface Post {
    id: number;
    member_id: number;
    board_id: number;
    title: string;
    content: string;
    created_at: Date;
    updated_at: Date;
}
  
export interface Member {
    id: number;
    email: string;
    password: string;
    nickname: string;
    created_at: Date;
    updated_at: Date;
}
  
export interface BoardRow extends Board, RowDataPacket {}
export interface PostRow extends Post, RowDataPacket {}
export interface MemberRow extends Member, RowDataPacket {}