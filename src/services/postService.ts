import { createPostDto, Post, Board, TotalCountResult, CheckBoardExists } from '../type/interface/postInterface';
import * as postModel from '../models/postModel';

export const createPost = async (
  memberId: number,
  boardId: number,
  postData: createPostDto
): Promise<Post> => {
  const post = await postModel.create(memberId, boardId, postData);

  return post;
};

export const updatePost = async (
  memberId: number,
  postId: number,
  postData: createPostDto
): Promise<Post> => {
  const post = await postModel.update(memberId, postId, postData);

  return post;
};

export const deletePost = async (
  memberId: number,
  postId: number
): Promise<void> => {
  const isDeleted = await postModel.deleteById(memberId, postId);

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
