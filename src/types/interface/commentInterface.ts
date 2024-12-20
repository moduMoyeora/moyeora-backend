import { RowDataPacket } from 'mysql2';

export interface TotalCountResult extends RowDataPacket {
  totalCount: number;
}

export interface CreateCommentDto {
  content: string;
  time: string;
}

export interface Comment extends RowDataPacket {
  id: number;
  post_id: number;
  member_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}
