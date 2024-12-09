import { getPostsByBoardIdFromDB } from '../models/boardModel';

export const getPostsByBoardId = async (board_id: number, limit: number, currentPage: number) => {
    const offset = limit * (currentPage - 1);
    return await getPostsByBoardIdFromDB(board_id, limit, offset);
};
