import { createPostDto } from '../type/interface/postInterface';
import * as postModel from '../models/postModel';

export const createPost = async (
  boardId: number,
  postData: createPostDto
) => {
  const memberId = 1; // 테스트용 유저
  const post = await postModel.create(memberId, boardId, postData);

  return post;
};
