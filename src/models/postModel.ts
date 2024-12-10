import { ResultSetHeader } from 'mysql2';
import pool from '../config/db';
import { createPostDto, Post } from '../type/interface/postInterface';

export const create = async (
  memberId: number,
  boardId: number,
  data: createPostDto
): Promise<Post> => {
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

export const update = async (
  memberId: number,
  postId: number,
  data: createPostDto
): Promise<Post> => {
  const [result] = await pool.query<ResultSetHeader>(
    'UPDATE post SET title = ?, content = ? WHERE id = ? AND member_id = ?',
    [data.title, data.content, postId, memberId]
  )

  if (result.affectedRows === 0) {
    throw Error("게시글을 찾을 수 없습니다.");
  }

  const [posts] = await pool.query<Post[]>(
    'SELECT * FROM post WHERE id = ?',
    [postId]
  )

  return posts[0];
}

export const deleteById = async (
  memberId: number,
  postId: number
): Promise<boolean> => {
  const [result] = await pool.query<ResultSetHeader>(
    'DELETE FROM post WHERE id = ? AND member_id = ?',
    [postId, memberId]
  )

  if (result.affectedRows === 0) {
    throw Error("게시글을 찾을 수 없습니다.");
  }

  return true;
}