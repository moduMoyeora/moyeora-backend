import { Request, Response } from 'express';
import * as postService  from '../services/postService';
import { StatusCodes } from 'http-status-codes';

export const getPostByIdController = async (req: Request, res: Response): Promise<void> => {

    const id = Number(req.params.id);
    const board_id = Number(req.params.board_id);

    try {
        const post = await postService.getPostById(id, board_id);
        if (!post) {
            throw new Error('게시물을 찾을 수 없습니다.');
        }
        else{
            res.status(StatusCodes.OK).json({ 
                message: '게시물 조회 성공' , 
                data : post
            });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: '서버 오류가 발생했습니다.',
            });
        }
        return;
    }
};

export const getPostsByBoardIdController = async (req: Request, res: Response): Promise<void> => {

    const board_id = Number(req.params.board_id);
    const limit = Number(req.query.limit) || 20;
    const currentPage = Number(req.query.currentPage) || 1;
    const boardExists = await postService.checkBoard(board_id);
    if (!boardExists) {
        res.status(StatusCodes.NOT_FOUND).json({ message: '게시판을 찾을 수 없습니다.' });
        return;
    }
    const { posts, totalCount } = await postService.getPostsByBoardId(board_id, limit, currentPage);
    if(posts.length > 0) {
        res.status(StatusCodes.OK).json({ 
            message: '게시물 목록 조회 성공',
            data : {
                posts,
                pagination : {
                    totalCount,
                    currentPage : currentPage,
                    totalPages: Math.ceil(totalCount / limit),
                    limit : limit,
                    },
            },
        });
    }else{
        res.status(StatusCodes.OK).json({ 
            message: '등록된 게시물이 없습니다.' 
        });
    }
};

