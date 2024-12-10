import * as postModel from '../models/postModel';

export const getPostById = async (id: number, board_id: number)=> {
    return await postModel.getPostByIdFromDB(id, board_id);
};

export const checkBoard = async (board_id: number): Promise<boolean> => {
    return await postModel.checkBoardExists(board_id);
};

export const getPostsByBoardId = async (
    board_id: number, 
    limit: number, 
    currentPage: number
    ) => {
    const offset = limit * (currentPage - 1);
    return await postModel.getPostsByBoardIdFromDB(board_id, limit, offset);
};
