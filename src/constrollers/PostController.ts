import { Request, Response } from 'express';
import { getPostById } from '../services/postService';
import { StatusCodes } from 'http-status-codes';

export const getPostByIdController = async (req: Request, res: Response): Promise<void> => {

    const { id } = req.params;

    try {
        const post = await getPostById(Number(id));
        if (post!=null) {
            res.status(StatusCodes.OK).json({ message: '게시물 조회 성공' , data : post});
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: '게시물을 찾을 수 없습니다.' });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 오류가 발생했습니다.' });
    }
};
