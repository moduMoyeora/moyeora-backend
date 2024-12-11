import { NextFunction, Request, Response } from 'express';
import * as postService from '../services/postService';

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const boardId = parseInt(req.params.boardId);
  const postData = req.body;
  const memberId = 1;

  try {
    const post = await postService.createPost(memberId, boardId, postData);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const postId = parseInt(req.params.postId);
  const postData = req.body;
  const memberId = 1;

  try {
    const post = await postService.updatePost(memberId, postId, postData);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const postId = parseInt(req.params.postId);
  const memberId = 1;

  try {
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
