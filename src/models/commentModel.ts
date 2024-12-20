import { ResultSetHeader } from 'mysql2';
import pool from '../config/db';
import { CreateCommentDto,Comment, TotalCountResult } from '../types/interface/commentInterface';
import { NotFoundError } from '../errors/httpError';

export const create = async (
  postId: number,
  memberId: number,
  data: CreateCommentDto
): Promise<Comment> => {
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO comment (post_id, member_id, content) VALUES (?, ?, ?);',
    [postId, memberId, data.content]
  );

  const [comments] = await pool.query<Comment[]>(
    'SELECT * FROM comment WHERE id = ?',
    [result.insertId]
  );

  return comments[0];
};

export const getByPostId = async (
  postId: number,
  limit: number,
  offset: number
  ): Promise<{
    comments: Comment[]; 
    totalCount: number;
  }> => {
  const [comments] = await pool.query<Comment[]>(
    `SELECT 
            comment.*,
            member.nickname
        FROM comment
        JOIN member ON comment.member_id = member.id
        WHERE comment.post_id = ?
        ORDER BY comment.created_at DESC
        LIMIT ? OFFSET ?`,
    [postId, limit, offset]
  );
  
  const [countComment] = await pool.query<TotalCountResult[]>(
    `SELECT COUNT(*) AS totalCount 
        FROM comment
        WHERE post_id = ?`, 
    [postId]
    );
  const totalCount = countComment[0]?.totalCount || 0;

  return { comments, totalCount };
};

export const update = async (
  commentId: number,
  data: CreateCommentDto
): Promise<Comment> => {
  const [result] = await pool.query<ResultSetHeader>(
    'UPDATE comment SET content = ? WHERE id = ?',
    [data.content, commentId]
  );

  if (result.affectedRows === 0) {
    throw new NotFoundError();
  }

  const [comments] = await pool.query<Comment[]>(
    'SELECT * FROM comment WHERE id = ?',
    [commentId]
  );

  return comments[0];
};

export const deleteById = async (commentId: number): Promise<void> => {
  const [result] = await pool.query<ResultSetHeader>(
    'DELETE FROM comment WHERE id = ?',
    [commentId]
  );

  if (result.affectedRows === 0) {
    throw new NotFoundError();
  }
};
