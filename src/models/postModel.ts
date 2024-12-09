import pool from '../mariadb';
import { Post } from '../types/index';

export const getPostByIdFromDB = async (id: number): Promise<Post | null> => {
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
    const [rows] = await pool.query<Post[]>(sql, [id]);
    return rows.length > 0 ? rows[0] : null;
};
