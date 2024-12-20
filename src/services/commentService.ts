
import * as commentModel from '../models/commentModel';
import { CreateCommentDto, Comment } from '../types/interface/commentInterface';

export const createComment = async (
  //boardId: number,
  postId: number,
  memberId: number,
  commentData: CreateCommentDto
): Promise<Comment> => {
  const comment = await commentModel.create(postId, memberId, commentData);

  return comment;
};

export const getComments = async (
  postId: number,
  limit: number,
  currentPage: number
) => {
  const offset = limit * (currentPage - 1);
  const comments = await commentModel.getByPostId(postId, limit, offset);
  return comments;
};

export const updateComment = async (
  commentId: number,
  commentData: CreateCommentDto
): Promise<Comment> => {
  const comment = await commentModel.update(commentId, commentData);

  return comment;
};

export const deleteComment = async (commentId: number): Promise<void> => {
  await commentModel.deleteById(commentId);
};
