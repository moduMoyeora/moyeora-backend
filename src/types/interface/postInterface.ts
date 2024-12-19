import { RowDataPacket } from 'mysql2';

export interface CreatePostDto {
  title: string;
  content: string;
  status: 'draft' | 'published';
}

export interface TotalCountResult extends RowDataPacket {
  totalCount: number;
}

export interface Post extends RowDataPacket {
  id: number;
  member_id: number;
  board_id: number;
  title: string;
  content: string;
  statusId: number;
  created_at: Date;
  updated_at: Date;
}

export interface Member extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  nickname: string;
  created_at: Date;
  updated_at: Date;
}
