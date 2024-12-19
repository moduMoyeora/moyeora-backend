import pool from '../config/db';
import { NotFoundError } from '../errors/httpError';
import { Board, CheckBoardExists } from '../types/interface/boardInterface';

export const checkBoardExists = async (boardId: number): Promise<void> => {
  const query = `SELECT 1 FROM board WHERE id = ? LIMIT 1`;
  const [result] = await pool.query<CheckBoardExists[]>(query, [boardId]);
  if (result.length === 0) {
    throw new NotFoundError(`게시판 ID ${boardId}를 찾을 수 없습니다.`);
  }
};

export const getBoardById = async (boardId: number): Promise<Board> => {
  const [board] = await pool.query<Board[]>(
    'SELECT * FROM board WHERE id = ? LIMIT 1',
    [boardId]
  );

  return board[0];
};
