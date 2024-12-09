import pool from '../mariadb';
import { BoardRow } from '../types/index';

export const getPostsByBoardIdFromDB = async (board_id: number, limit: number, offset: number): Promise<BoardRow[]>=> {
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
    const [rows] = await pool.query<BoardRow[]>(sql, [board_id, limit, offset]);
    return rows;
};
