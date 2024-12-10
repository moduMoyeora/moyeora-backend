import pool from '../config/db';
import { Post, Board, TotalCountResult, CheckBoardExists } from '../types/interface/postInterface';

export const getPostByIdFromDB = async (
    id: number,
    board_id: number
    ): Promise<Post | null> => {
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
    const [rows] = await pool.query<Post[]>(sql, [id, board_id]);
    return rows.length > 0 ? rows[0] : null;
};

export const checkBoardExists = async (board_id: number): Promise<boolean> => {
    const query = `SELECT 1 FROM board WHERE id = ? LIMIT 1`;
    const [rows] = await pool.query<CheckBoardExists[]>(query, [board_id]);
    return rows.length > 0;
};

export const getPostsByBoardIdFromDB = async (
    board_id: number, 
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
    const [rows] = await pool.query<Board[]>(queryPosts, [board_id, limit, offset]);
    
    const queryCount = `
        SELECT COUNT(*) AS totalCount 
        FROM post
        WHERE board_id = ?
    `;
    const [countResult] = await pool.query<TotalCountResult[]>(queryCount, [board_id]);
    const totalCount = countResult[0]?.totalCount || 0;

    return { posts: rows, totalCount };
};
