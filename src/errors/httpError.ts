class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string = '잘못된 요청입니다.') {
    super(message, 400);
    this.name = 'BadRequestError';
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string = '권한이 없습니다.') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = '리소스를 찾을 수 없습니다.') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}