import { NextFunction, Request, Response } from 'express';
import * as userModel from '../models/userModel';
import { check_duplicate } from '../types/interface/userInterface';
import {  UnauthorizedError } from '../errors/httpError';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const joinUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, nickname } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const user = await userModel.join(email, hashedPassword, nickname);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const checkDuplicate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { field, value } = req.body as unknown as check_duplicate;
    const isDuplicate = await userModel.checkDuplicate(field, value);

    res.status(200).json({ isDuplicate : isDuplicate});
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const response = await userModel.login(email);    
    if (response === null) {
      throw new UnauthorizedError('아이디나 비밀번호가 틀립니다');
    }
    const user = response;
    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError('아이디나 비밀번호가 틀립니다');
    }

    const token = jwt.sign(
      {
        id: user.id,
        nickName : user.nickname
      },
      process.env.PRIVATE_KEY,
      {
        expiresIn: '1000000000m',
        issuer: 'moyeora-server',
      }
    );

    res.cookie('Authorization', token, {
      httpOnly: false,
    });

    res.status(200).json({ message: '로그인 성공' });
  } catch (error) {
    next(error);
  }
};
