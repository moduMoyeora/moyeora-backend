import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../config/db';
import {
  CreatePostDto,
  Post,
  TotalCountResult,
} from '../types/interface/postInterface';
import { Board } from '../types/interface/boardInterface';
import { InternalServerError, NotFoundError } from '../errors/httpError';

export const create = async (
  memberId: number,
  boardId: number,
  data: CreatePostDto
): Promise<Post> => {
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO post (member_id, board_id, title, content, status) VALUES (?, ?, ?, ?, ?);',
    [memberId, boardId, data.title, data.content, data.status]
  );

  const [posts] = await pool.query<Post[]>('SELECT * FROM post WHERE id = ?', [
    result.insertId,
  ]);

  return posts[0];
};

export const update = async (
  postId: number,
  data: CreatePostDto
): Promise<Post> => {
  const [result] = await pool.query<ResultSetHeader>(
    'UPDATE post SET title = ?, content = ? WHERE id = ?',
    [data.title, data.content, postId]
  );

  if (result.affectedRows === 0) {
    throw new NotFoundError('게시글을 찾을 수 없습니다.');
  }

  const [posts] = await pool.query<Post[]>('SELECT * FROM post WHERE id = ?', [
    postId,
  ]);

  return posts[0];
};

export const deleteById = async (postId: number): Promise<void> => {
  const [result] = await pool.query<ResultSetHeader>(
    'DELETE FROM post WHERE id = ?',
    [postId]
  );

  if (result.affectedRows === 0) {
    throw new NotFoundError('게시글을 찾을 수 없습니다.');
  }
};

export const getPostById = async (
  postId: number,
  boardId: number
): Promise<Post> => {
  const sql = `
        SELECT 
            post.*, 
            member.nickname AS author, 
            board.name AS board_name, 
            board.description AS board_description
        FROM post
        JOIN member ON post.member_id = member.id
        JOIN board ON post.board_id = board.id
        WHERE post.id = ? AND post.board_id = ?
    `;
  const [result] = await pool.query<Post[]>(sql, [postId, boardId]);
  if (result.length === 0) {
    throw new NotFoundError('게시글을 찾을 수 없습니다.');
  }
  return result[0];
  //return rows.length > 0 ? rows[0] : null;
};

export const getPostsByBoardId = async (
  boardId: number,
  limit: number,
  offset: number
): Promise<{
  posts: Board[];
  totalCount: number;
}> => {
  const queryPosts = `
        SELECT 
            post.*,
            member.nickname
        FROM post
        JOIN member ON post.member_id = member.id
        WHERE post.board_id = ? AND post.status = 'published'
        ORDER BY post.created_at DESC
        LIMIT ? OFFSET ?
    `;
  const [result] = await pool.query<Board[]>(queryPosts, [
    boardId,
    limit,
    offset,
  ]);

  const queryCount = `
        SELECT COUNT(*) AS totalCount 
        FROM post
        WHERE board_id = ?
    `;
  const [countResult] = await pool.query<TotalCountResult[]>(queryCount, [
    boardId,
  ]);
  const totalCount = countResult[0]?.totalCount || 0;

  return { posts: result, totalCount };
};

export const updateStatus = async (
  postId: number,
  status: 'draft' | 'published'
): Promise<void> => {
  const [result] = await pool.query<ResultSetHeader>(
    'UPDATE post SET status = ? WHERE id = ?',
    [status, postId]
  );

  if (result.affectedRows === 0) {
    throw new NotFoundError();
  }
};

export const getMemberByPostId = async (postId: number): Promise<number> => {
  try {
    const query = `SELECT member_id FROM post where id = ?`;
    const [rows] = await pool.query<RowDataPacket[]>(query, [postId]);
    const result = rows[0] as { member_id: number };
    return result.member_id;
  } catch {
    throw new InternalServerError('데이터베이스 접근 중 오류가 발생했습니다');
  }
};
