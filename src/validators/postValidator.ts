import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

const boardParamValidationRules = () => {
  return [
    param('boardId')
      .notEmpty().withMessage('게시판 아이디는 필수입니다.')
      .isInt().withMessage('게시판 아이디는 숫자여야 합니다.')
      .toInt()
  ]
}

export const createPostValidationRules = () => {
  return [
    ...boardParamValidationRules(),
    body('title')
      .notEmpty().withMessage('제목은 필수입니다.')
      .isLength({ min: 1, max: 100}).withMessage('제목은 1~100자 사이여야 합니다.'),
    body('content')
      .notEmpty().withMessage('내용은 필수입니다.'),
  ]
}

export const validatePost = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json(errors);
    return;
  }

  next();
}