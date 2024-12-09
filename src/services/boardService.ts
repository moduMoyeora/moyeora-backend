import { getPostsByBoardIdFromDB } from '../models/boardModel';

export const getPostsByBoardId = async (board_id: number, limit: number, currentPage: number) => {
    const offset = limit * (currentPage - 1);
    const posts = await getPostsByBoardIdFromDB(board_id, limit, offset);
    return posts;
};
