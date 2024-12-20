import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as postModel from '../models/postModel';
import { ForbiddenError, UnauthorizedError } from '../errors/httpError';

const parseAndDecode = (
  cookieHeader: string | undefined
): jwt.JwtPayload | null => {
  if (!cookieHeader) throw new UnauthorizedError('헤더에 쿠키가 없습니다');

  const cookies = cookieHeader
    .split(';')
    .reduce((acc: Record<string, string>, cookie) => {
      const [key, value] = cookie.split('=').map((part) => part.trim());
      if (key && value) {
        acc[key] = decodeURIComponent(value);
      }
      return acc;
    }, {});

  const token = cookies['Authorization'];
  if (!token)
    throw new UnauthorizedError('지정된 authorization 쿠키가 없습니다');

  const decoded = jwt.decode(token) as jwt.JwtPayload;
  if (decoded.exp && Date.now() / 1000 > decoded.exp)
    throw new UnauthorizedError('토큰이 만료되었습니다');

  return decoded;
};

export const authWithMemberId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.cookie;
  try {
    const tokenContent = parseAndDecode(token);
    if (!tokenContent || !tokenContent.id) {
      throw new UnauthorizedError('토큰에 유효한 사용자 정보가 없습니다');
    }
    const tokenUserId = tokenContent.id;
    const requestedUserId = req.params.memberId;
    if (tokenUserId != requestedUserId) {
      throw new ForbiddenError('이 작업을 수행할 권한이 없습니다');
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const authWithPostId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.cookie;
  const postId = req.params.postId;
  try {
    const tokenContent = parseAndDecode(token);
    if (!tokenContent || !tokenContent.id) {
      throw new UnauthorizedError('토큰에 유효한 사용자 정보가 없습니다');
    }
    const tokenUserId = tokenContent.id;
    const requestedUserId = await postModel.getMemberByPostId(parseInt(postId));
    if (tokenUserId != requestedUserId) {
      throw new ForbiddenError('이 작업을 수행할 권한이 없습니다');
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const authOnlyLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.cookie;
  try {
    parseAndDecode(token);
    next();
  } catch (error) {
    next(error);
  }
};
