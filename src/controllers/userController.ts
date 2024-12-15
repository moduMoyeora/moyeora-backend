import { Request, Response } from 'express';
import * as userModel from '../models/userModel';
import { check_duplicate } from '../types/interface/userInterface';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const joinUser = async (req: Request, res: Response) => {
  const { email, password, nickname } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const user = await userModel.join(email, hashedPassword, nickname);
    res.status(200).json(user);
  } catch (error) {
    res.json(error);
  }
};

export const checkDuplicate = async (req: Request, res: Response) => {
  try {
    const { field, value } = req.query as unknown as check_duplicate;
    const isDuplicate = await userModel.checkDuplicate(field, value);

    res.status(200).json({ isDuplicate : isDuplicate});
  } catch (error) {
    res.json(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const response = await userModel.login(email);    
    if (response === null) {
      res.status(401).json({ message: '아이디나 비밀번호가 틀립니다' });
      return;
    }
    const user = response[0];
    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: '아이디나 비밀번호가 틀립니다' });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        nickName : user.nickname
      },
      process.env.PRIVATE_KEY,
      {
        expiresIn: '1000000000m',
        issuer: 'moyeora-server',
      }
    );

    res.cookie('Authorization', token, {
      httpOnly: true,
    });

    res.status(200).json({ message: '로그인 성공' });
  } catch (error) {
    res.json(error);
  }
};
