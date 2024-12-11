import { Request, Response } from 'express';
import * as userModel from '../models/userModel';
import { emit } from 'process';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const joinUser = async (req: Request, res: Response) => {
  const { email, password, nickname } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const user = await userModel.join(email, hashedPassword, nickname);
    res.status(200).json(user);
    return;
  } catch (error) {
    res.json(error);
    return;
  }
};

export const checkEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await userModel.checkEmail(email);
    if (user === null) {
      res.status(200).json({ email: email, isAvailable : true });
      return;
    }

    res.status(409).json({ email: email, isAvailable : false });
    return;
  } catch (error) {
    res.json(error);
    return;
  }
};

export const checkNickname = async (req: Request, res: Response) => {
  const { nickname } = req.body;
  try {
    const user = await userModel.checkNickname(nickname);
    if (user === null) {
      res.status(200).json({ nickname: nickname, isAvailable : true });
      return;
    }

    res.status(409).json({ nickname: nickname, isAvailable : false });
    return;
  } catch (error) {
    res.json(error);
    return;
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.login(email);
    if (user === null) {
      res.status(401).json({ message: '아이디나 비밀번호가 틀립니다' });
      return;
    }

    const isMatch = await bcrypt.compareSync(password, user[0].password);
    if (!isMatch) {
      res.status(401).json({ message: '아이디나 비밀번호가 틀립니다' });
      return;
    }

    const token = jwt.sign(
      {
        id: user[0].id,
        email: user[0].email,
        nickName : user[0].nickname
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
    return;
  } catch (error) {
    res.json(error);
    return;
  }
};
