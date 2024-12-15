import { NextFunction, Request, Response } from 'express';
import { body, query, validationResult } from 'express-validator';

export const joinUserValidationRules = () => {
  return [
    body('email')
      .notEmpty()
      .withMessage('사용할 아이디는 필수입니다')
      .isEmail()
      .withMessage('아이디는 이메일 형식이어야 합니다'),
    body('password')
      .notEmpty()
      .withMessage('사용할 비밀번호는 필수입니다'),
    body('nickname')
      .notEmpty()
      .withMessage('사용할 닉네임은 필수입니다')
      .isLength({ min : 2})
      .withMessage('사용할 닉네임은 2자 이상이어야 합니다'),
  ];
};

export const checkDuplicateRules =() => {
  return [
    query('field')
      .notEmpty()
      .withMessage('field(email | nickname)값은 필수입니다'),
    query('value')
      .notEmpty()
      .withMessage('중복을 확인할 데이터는 필수입니다')
  ]
}

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

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json(errors);
    return;
  }

  next();
};
