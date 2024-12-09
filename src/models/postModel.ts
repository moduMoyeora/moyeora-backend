import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../config/db';
import { createPostDto } from '../type/interface/postInterface';

interface Post extends RowDataPacket {
  id: number;
  member_id: number;
  board_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const create = async (
  memberId: number,
  boardId: number,
  data: createPostDto
) => {
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO post (member_id, board_id, title, content) VALUES (?, ?, ?, ?);',
    [memberId, boardId, data.title, data.content]
  );

  const [posts] = await pool.query<Post[]>(
    'SELECT * FROM post WHERE id = ?',
    [result.insertId]
  )

  return posts[0];
};
