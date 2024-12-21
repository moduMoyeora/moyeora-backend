import { Request, Response, NextFunction } from 'express';
import * as boardService from '../services/boardService';

export const getBoards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const limit = Number(req.query.limit);
  const currentPage = Number(req.query.currentPage);
  try {
    const boards = await boardService.getBoards(limit, currentPage);
    res.status(200).json(boards);
  } catch (error) {
    next(error);
  }
};
