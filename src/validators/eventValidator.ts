import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/httpError';
import {
  boardParamValidationRules,
  postParamValidationRules,
} from './postValidator';

export const eventParamValidationRules = () => {
  return [
    param('eventId')
      .notEmpty()
      .withMessage('이벤트 아이디는 필수입니다.')
      .isInt()
      .withMessage('이벤트 아이디는 숫자여야 합니다.'),
  ];
};

export const createEventValidationRules = () => {
  return [
    ...boardParamValidationRules(),
    ...postParamValidationRules(),
    body('location')
      .notEmpty()
      .withMessage('장소는 필수입니다.')
      .isString()
      .withMessage('장소는 문자열입니다.')
      .trim(),
    body('time')
      .notEmpty()
      .withMessage('시간은 필수입니다.')
      .isISO8601()
      .withMessage('시간은 ISO8601 포맷(YYYY-MM-DDThh:mm:ssZ)입니다.'),
  ];
};

export const updateEventValidationRules = () => {
  return [
    ...eventParamValidationRules(),
    body('location')
      .notEmpty()
      .withMessage('장소는 필수입니다.')
      .isString()
      .withMessage('장소는 문자열입니다.')
      .trim(),
    body('time')
      .notEmpty()
      .withMessage('시간은 필수입니다.')
      .isISO8601()
      .withMessage('시간은 ISO8601 포맷(YYYY-MM-DDThh:mm:ssZ)입니다.'),
  ];
};

export const sendEmailValidationRules = () => {
  return [
    ...boardParamValidationRules(),
    ...postParamValidationRules(),
    body('commentId')
      .notEmpty()
      .withMessage('댓글 아이디는 필수입니다.')
      .isInt()
      .withMessage('댓글 아이디는 정수입니다.'),
  ];
};

export const validateEvent = (
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
