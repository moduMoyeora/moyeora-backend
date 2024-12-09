import { Request, Response } from 'express';
import * as postService from '../services/postService';

export const createPost = async (req: Request, res: Response) => {
  const boardId = parseInt(req.params.boardId);
  const postData = req.body;

  try {
    const post = await postService.createPost(boardId, postData);
    res.status(200).json(post);
    return;
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다' });
    return;
  }
};
