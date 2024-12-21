import { NextFunction, Request, Response } from 'express';
import { JwtRequest } from '../types/interface/userInterface';
import * as commentService from '../services/commentService';
import { ForbiddenError } from '../errors/httpError';

export const createComment = async (
  req: JwtRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const postId = Number(req.params.postId);
  const commentData = req.body;
  const memberId = req.user?.id;

  if (!memberId) {
    throw new ForbiddenError();
  }
  try {
    const comment = await commentService.createComment(
      postId,
      memberId,
      commentData
    );
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (
  req: JwtRequest,
  res: Response,
  next: NextFunction
) => {
  const commentId = Number(req.params.commentId);
  const commentData = req.body;

  try {
    const comment = await commentService.updateComment(commentId, commentData);
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentId = Number(req.params.commentId);

  try {
    await commentService.deleteComment(commentId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const getComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const postId = Number(req.params.postId);
  const limit = Number(req.query.limit) || 5;
  const currentPage = Number(req.query.currentPage) || 1;

  try {
    const { comments, totalCount } = await commentService.getComments(
      postId,
      limit,
      currentPage
    );

    if (comments.length > 0) {
      res.status(200).json({
        message: '댓글 목록 조회 성공',
        data: {
          comments,
          pagination: {
            totalCount,
            currentPage: currentPage,
            totalPages: Math.ceil(totalCount / limit),
            limit: limit,
          },
        },
      });
    } else {
      res.status(204).json({
        message: '게시판에 등록된 댓글이 없습니다.',
      });
    }
  } catch (error) {
    next(error);
  }
};
