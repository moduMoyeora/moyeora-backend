import { RowDataPacket } from "mysql2";

export interface createPostDto {
  title: string;
  content: string;
}

export interface Post extends RowDataPacket {
  id: number;
  member_id: number;
  board_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}