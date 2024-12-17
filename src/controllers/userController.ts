import { NextFunction, Request, Response } from 'express';
import * as userModel from '../models/userModel';
import { check_duplicate, Profile } from '../types/interface/userInterface';
import { NotFoundError, UnauthorizedError } from '../errors/httpError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const joinUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const checkDuplicate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { field, value } = req.body as unknown as check_duplicate;
  try {
    const isDuplicate = await userModel.checkDuplicate(field, value);

    res.status(200).json({ isDuplicate: isDuplicate });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      throw new Error('PRIVATE_KEY environment variable is not set');
    }

    const token = jwt.sign(
      {
        id: user.id,
        nickName: user.nickname,
      },
      privateKey,
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

export const viewProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    const response = await userModel.viewProfile(parseInt(userId));
    if (response === null) {
      throw new NotFoundError('해당 사용자를 찾을 수 없습니다');
    }

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const editProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { nickname, name, gender, region, age, description }: Profile = req.body;
  const updateData: Profile = {nickname, name, gender, region, age, description};
  try{  
    await userModel.editProfile(parseInt(userId), updateData);
    res.status(200).json({message: '프로필 업데이트 완료'});
  } catch (error){
    next(error);
  }
};
