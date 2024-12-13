import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || '서버에서 문제가 발생하였습니다.' });
};
