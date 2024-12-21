import * as boardModel from '../models/boardModel';

export const getBoards = async (
  limit: number,
  currentPage: number
): Promise<boardModel.BoardSummary[]> => {
  const offset = limit * (currentPage - 1);
  const boards = await boardModel.findAllBoards(limit, offset);

  return boards;
};
