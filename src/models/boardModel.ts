import pool from '../mariadb';
import { Board, TotalCountResult } from '../types/index';

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
