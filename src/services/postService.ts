import * as postModel from '../models/postModel';
import { Post, Board, TotalCountResult, CheckBoardExists } from '../types/interface/postInterface';

export const getPost = async (
    postId: number, 
    boardId: number
    ): Promise<Post>=> {
    return await postModel.getPostById(postId, boardId);
};

export const checkBoard = async (
    boardId: number
    ): Promise<void> => {
    await postModel.checkBoardExists(boardId);
};

export const getPosts = async (
    boardId: number, 
    limit: number, 
    currentPage: number
    ) => {
    const offset = limit * (currentPage - 1);
    return await postModel.getPostsByBoardId(boardId, limit, offset);
};
