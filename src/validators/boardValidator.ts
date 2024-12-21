import { Request, Response, NextFunction } from 'express';
import { query, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/httpError';

export const offsetQueryValidationRules = () => {
  return [
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

export const validateBoard = (
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
