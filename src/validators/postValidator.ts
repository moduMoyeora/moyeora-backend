import { Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { BadRequestError } from "../errors/httpError";

const boardParamValidationRules = () => {
    return [
      param('boardId')
        .notEmpty().withMessage('게시판 아이디는 필수입니다.')
        .isInt().withMessage('게시판 아이디는 숫자여야 합니다.')
        .toInt()
    ]
  }

export const getPostsByBoardIdValidationRules = () => {
    return [
        ...boardParamValidationRules(),
        query('limit')
            .optional()
            .isInt({ min: 1 }).withMessage('limit은 1 이상의 정수여야 합니다.')
            .toInt(),
        query('currentPage')
            .optional()
            .isInt({ min: 1 }).withMessage('currentPage는 1 이상의 정수여야 합니다.')
            .toInt()
        ];
}

export const getPostByIdValidationrules = () =>{
    return [
        ...boardParamValidationRules(),
        param('postId')
            .isNumeric().withMessage('id는 숫자여야 합니다.')
            .toInt(),
    ];
}

export const validatePost = (req : Request, res : Response, next : NextFunction): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        next(new BadRequestError());
    }
    next();
}

