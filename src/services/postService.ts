import { createPostDto, Post } from '../type/interface/postInterface';
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
};
