import { NextFunction, Request, Response } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/httpError';

const boardParamValidationRules = () => {
  return [
    param('boardId')
      .notEmpty()
      .withMessage('게시판 아이디는 필수입니다.')
      .isInt()
      .withMessage('게시판 아이디는 숫자여야 합니다.'),
  ];
};

export const postParamValidationRules = () => {
  return [
    param('postId')
      .notEmpty()
      .withMessage('게시글 아이디는 필수입니다.')
      .isInt()
      .withMessage('게시글 아이디는 숫자여야 합니다.'),
  ];
};

export const createPostValidationRules = () => {
  return [
    ...boardParamValidationRules(),
    body('title')
      .notEmpty()
      .withMessage('제목은 필수입니다.')
      .isLength({ min: 1, max: 100 })
      .withMessage('제목은 1~100자 사이여야 합니다.'),
    body('content').notEmpty().withMessage('내용은 필수입니다.'),
  ];
};

export const updatePostValidationRules = () => {
  return [
    ...postParamValidationRules(),
    body('title')
      .notEmpty()
      .withMessage('제목은 필수입니다.')
      .isLength({ min: 1, max: 100 })
      .withMessage('제목은 1~100자 사이여야 합니다.'),
    body('content').notEmpty().withMessage('내용은 필수입니다.'),
  ];
};

export const getPostsByBoardIdValidationRules = () => {
  return [
    ...boardParamValidationRules(),
    query('limit')
      .optional()
      .isInt({ min: 1 })
      .withMessage('limit은 1 이상의 정수여야 합니다.')
      .toInt(),
    query('currentPage')
      .optional()
      .isInt({ min: 1 })
      .withMessage('currentPage는 1 이상의 정수여야 합니다.')
      .toInt(),
  ];
};

export const getPostByIdValidationrules = () => {
  return [
    ...boardParamValidationRules(),
    param('postId').isNumeric().withMessage('id는 숫자여야 합니다.').toInt(),
  ];
};

export const validatePost = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(new BadRequestError());
  }
  next();
};
