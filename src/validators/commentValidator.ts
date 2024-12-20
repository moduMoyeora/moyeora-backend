import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/httpError';

export const commentParamValidationRules = () => {
  return [
    param('postId')
      .notEmpty()
      .withMessage('post_id는 필수입니다.')
      .isInt()
      .withMessage('post_id는 숫자여야 합니다.'),
  ];
};

export const createCommentValidationRules = () => {
  return [
    body('content')
      .notEmpty()
      .withMessage('내용은 필수입니다.')
      .isString()
      .withMessage('내용은 문자열입니다.')
      .trim(),
  ];
};

export const updateCommentValidationRules = () => {
  return [
    ...commentParamValidationRules(),
    body('content')
      .notEmpty()
      .withMessage('내용은 필수입니다.')
      .isString()
      .withMessage('내용은 문자열입니다.')
      .trim(),
  ];
};

export const validateComment = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((err) => err.msg)
      .join(', ');

    next(new BadRequestError(errorMessages));
  }
  next();
};
