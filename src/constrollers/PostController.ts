import { Request, Response } from 'express';
import pool from '../mariadb';
import { RowDataPacket } from 'mysql2'; // RowDataPacket 가져오기
import { Post } from '../types/index';
import { StatusCodes } from 'http-status-codes';

// 특정 게시판의 게시물 조회
export const getPostsByBoardId = async (req: Request, res: Response): Promise<void> => {
  const { board_id } = req.params;
  const { limit = '20', currentPage = '1' } = req.query;

  const offset = Number(limit) * (Number(currentPage) - 1);

  const sql = `
    SELECT 
        post.id, 
        post.title, 
        member.nickname AS author, 
        post.created_at AS time, 
        post.content
    FROM post
    JOIN member ON post.member_id = member.id
    WHERE post.board_id = ?
    ORDER BY post.created_at DESC
    LIMIT ? OFFSET ?
    `;

  try {
    // 쿼리 실행 (RowDataPacket 타입으로 명시)
    const [results] = await pool.query<(Post & RowDataPacket)[]>(sql, [Number(board_id), Number(limit), offset]);

    if (results.length > 0) {
      res.status(StatusCodes.OK).json(results);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: '게시물을 찾을 수 없습니다.' });
    }
  } catch (err) {
    console.error('Database Error:', err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '서버 오류가 발생했습니다.' });
  }
};

// 개별 게시물 조회
export const getPostById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const sql = `
    SELECT 
    post.*, 
    member.nickname AS author, 
    board.name AS board_name, 
    board.description AS board_description
    FROM post
    JOIN member ON post.member_id = member.id
    JOIN board ON post.board_id = board.id
    WHERE post.id = ?
    `;

  try {
    const [results] = await pool.query<(Post & RowDataPacket)[]>(sql, [Number(id)]);

    if (results.length > 0) {
      res.status(StatusCodes.OK).json(results[0]);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: '게시물을 찾을 수 없습니다.' });
    }
  } catch (err) {
    console.error('Database Error:', err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '서버 오류가 발생했습니다.' });
  }
};
