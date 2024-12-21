import { CreatePostDto, Post } from '../types/interface/postInterface';
import * as postModel from '../models/postModel';
import * as boardModel from '../models/boardModel';
import * as eventModel from '../models/eventModel';

export const createPost = async (
  memberId: number,
  boardId: number,
  postData: CreatePostDto
): Promise<Post> => {
  const board = await boardModel.getBoardById(boardId);

  postData.status = board.is_event_enabled ? 'draft' : 'published';
  const post = await postModel.create(memberId, boardId, postData);

  return post;
};

export const updatePost = async (
  postId: number,
  postData: CreatePostDto
): Promise<Post> => {
  const post = await postModel.update(postId, postData);

  return post;
};

export const deletePost = async (
  boardId: number,
  postId: number
): Promise<void> => {
  const board = await boardModel.getBoardById(boardId);

  if (board.is_event_enabled) {
    const event = await eventModel.findByPostId(postId);

    await eventModel.deleteById(event.id);
  }

  await postModel.deleteById(postId);
};

export const getPost = async (
  postId: number,
  boardId: number
): Promise<Post> => {
  return await postModel.getPostById(postId, boardId);
};

export const checkBoard = async (boardId: number): Promise<void> => {
  await boardModel.checkBoardExists(boardId);
};

export const getPosts = async (
  boardId: number,
  limit: number,
  currentPage: number
) => {
  const offset = limit * (currentPage - 1);
  return await postModel.getPostsByBoardId(boardId, limit, offset);
};
