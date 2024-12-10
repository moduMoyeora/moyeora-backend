import { Request, Response } from 'express';
import * as postService from '../services/postService';

export const createPost = async (req: Request, res: Response) => {
  const boardId = parseInt(req.params.boardId);
  const postData = req.body;
  const memberId = 1;

  try {
    const post = await postService.createPost(memberId, boardId, postData);
    res.status(201).json(post);
    return;
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다' });
    return;
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId);
  const postData = req.body;
  const memberId = 1;

  try {
    const post = await postService.updatePost(memberId, postId, postData);
    res.status(200).json(post);
    return;
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다' });
    return;
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId);
  const memberId = 1;

  try {
    const isDeleted = await postService.deletePost(memberId, postId);
    res.status(200).json({ success: isDeleted, postId: postId });
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다' });
    return;
  }
};
