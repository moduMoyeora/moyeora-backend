import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as postModel from '../models/postModel';
import * as commentModel from '../models/commentModel';
import { ForbiddenError, UnauthorizedError } from '../errors/httpError';
import { JwtRequest, UserPayload } from '../types/interface/userInterface';

const isUserPayload = (decoded: jwt.JwtPayload): decoded is UserPayload => {
  return 'id' in decoded && typeof decoded.id === 'number';
};

const parseAndDecode = (cookieHeader: string | undefined): UserPayload => {
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

  const decoded = jwt.decode(token);
  if (!decoded) {
    throw new UnauthorizedError('토큰이 유효하지 않습니다');
  }

  if (typeof decoded === 'string') {
    throw new UnauthorizedError('토큰이 잘못된 형식입니다');
  }

  if (decoded.exp && Date.now() / 1000 > decoded.exp) {
    throw new UnauthorizedError('토큰이 만료되었습니다');
  }

  if (!isUserPayload(decoded)) {
    throw new UnauthorizedError('토큰에 필요한 정보가 없습니다');
  }

  return decoded;
};

export const authWithMemberId = async (
  req: JwtRequest,
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
    const requestedUserId = Number(req.params.memberId);
    if (tokenUserId !== requestedUserId) {
      throw new ForbiddenError('이 작업을 수행할 권한이 없습니다');
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const authWithPostId = async (
  req: JwtRequest,
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
    req.user = tokenContent;
    next();
  } catch (error) {
    next(error);
  }
};

export const authOnlyLoggedIn = async (
  req: JwtRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.cookie;
  try {
    const tokenContent = parseAndDecode(token);
    req.user = tokenContent;
    next();
  } catch (error) {
    next(error);
  }
};

export const authWithCommentId = async (
  req: JwtRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.cookie;
  const commentId = req.params.commentId;

  try {
    const tokenContent = parseAndDecode(token);
    const tokenUserId = tokenContent.id;

    const commentAuthorId = await commentModel.getMemberByCommentId(
      parseInt(commentId)
    );
    if (tokenUserId !== commentAuthorId) {
      throw new ForbiddenError('댓글을 수정/삭제할 권한이 없습니다.');
    }

    req.user = tokenContent;
    next();
  } catch (error) {
    next(error);
  }
};
