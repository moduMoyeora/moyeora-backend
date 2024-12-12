import { ResultSetHeader } from 'mysql2';
import pool from '../config/db';
import { Post, Board, TotalCountResult, CheckBoardExists } from '../types/interface/postInterface';
import { NotFoundError } from '../errors/httpError';

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
        throw new NotFoundError("게시글을 찾을 수 없습니다.");
      }
    return result[0];
    //return rows.length > 0 ? rows[0] : null;
};

export const checkBoardExists = async (
    boardId: number
    ): Promise<void> => {
    const query = `SELECT 1 FROM board WHERE id = ? LIMIT 1`;
    const [result] = await pool.query<CheckBoardExists[]>(query, [boardId]);
    if (result.length === 0) {
        throw new NotFoundError(`게시판 ID ${boardId}를 찾을 수 없습니다.`);
    }
};

export const getPostsByBoardId = async (
    boardId: number, 
    limit: number, 
    offset: number
    ): Promise<{ 
        posts: Board[]; 
        totalCount: number 
    }> => {
    const queryPosts = `
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
    const [result] = await pool.query<Board[]>(queryPosts, [boardId, limit, offset]);

    const queryCount = `
        SELECT COUNT(*) AS totalCount 
        FROM post
        WHERE board_id = ?
    `;
    const [countResult] = await pool.query<TotalCountResult[]>(queryCount, [boardId]);
    const totalCount = countResult[0]?.totalCount || 0;
    
    return { posts: result, totalCount };
};
