import { NextFunction, Request, Response } from 'express';
import { body, query, param, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/httpError';

export const joinUserValidationRules = () => {
  return [
    body('email')
      .notEmpty()
      .withMessage('사용할 아이디는 필수입니다')
      .isEmail()
      .withMessage('아이디는 이메일 형식이어야 합니다'),
    body('password').notEmpty().withMessage('사용할 비밀번호는 필수입니다'),
    body('nickname')
      .notEmpty()
      .withMessage('사용할 닉네임은 필수입니다')
      .isLength({ min: 2 })
      .withMessage('사용할 닉네임은 2자 이상이어야 합니다'),
  ];
};

export const checkDuplicateRules = () => {
  return [
    query('field')
      .isIn(['email', 'nickname'])
      .withMessage('field는 "email" 또는 "nickname"이어야 합니다')
      .notEmpty()
      .withMessage('중복을 확인할 필드는 필수입니다'),
    query('value').notEmpty().withMessage('중복을 확인할 데이터는 필수입니다'),
  ];
};

export const loginUserValidationRules = () => {
  return [
    body('email')
      .notEmpty()
      .withMessage('로그인할 아이디를 입력해주세요')
      .isEmail()
      .withMessage('아이디는 이메일 형식이어야 합니다'),
    body('password').notEmpty().withMessage('로그인할 비밀번호를 입력해주세요'),
  ];
};

export const viewProfileRules = () => {
  return [
    param('memberId').notEmpty().withMessage('조회할 사용자 ID를 입력해주세요'),
  ];
};

export const editProfileRules = () => {
  return [
    param('memberId').notEmpty().withMessage('수정할 사용자 ID를 입력해주세요'),
    body('nickname')
      .notEmpty()
      .withMessage('닉네임을 입력해주세요')
      .isString()
      .withMessage('닉네임은 문자열이어야 합니다'),
    body('name')
      .optional()
      .isString()
      .withMessage('이름은 문자열이어야 합니다'),
    body('gender')
      .optional()
      .isIn(['M', 'F'])
      .withMessage('성별은 "M" 또는 "F"여야 합니다'),
    body('region')
      .optional()
      .isString()
      .withMessage('지역은 문자열이어야 합니다'),
    body('age')
      .optional()
      .isInt({ min: 0 })
      .withMessage('유효한 나이를 입력해주세요'),
    body('description')
      .optional()
      .isString()
      .withMessage('설명은 문자열이어야 합니다'),
  ];
};

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(new BadRequestError());
  }
  next();
};
