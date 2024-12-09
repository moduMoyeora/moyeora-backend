import { Request, Response } from 'express';
import { getPostsByBoardId } from '../services/boardService';
import { StatusCodes } from 'http-status-codes';

export const getPostsByBoardIdController = async (req: Request, res: Response): Promise<void> => {

    const { board_id } = req.params;
    const { limit = 20, currentPage = 1 } = req.query;

    try {
        const { posts, totalCount } = await getPostsByBoardId(Number(board_id), Number(limit), Number(currentPage));
        if(posts.length > 0) {
            res.status(StatusCodes.OK).json({ 
                message: '게시물 목록 조회 성공',
                data : {
                    posts,
                    pagination : {
                        totalCount,
                        currentPage : Number(currentPage),
                        totalPages: Math.ceil(totalCount / Number(limit)),
                        limit : Number(limit),
                        },
                    },
                });
        }else{
            res.status(StatusCodes.NOT_FOUND).json({ 
                message: '게시판을 찾을 수 없습니다.' 
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            message: '서버 오류가 발생했습니다.' 
        });
    }
};

