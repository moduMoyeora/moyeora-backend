import { NextFunction, Request, Response } from 'express';
import * as postService  from '../services/postService';
import { StatusCodes } from 'http-status-codes';

export const getPost = async (
    req: Request, 
    res: Response,
    next: NextFunction
    ): Promise<void> => {

    const postId = Number(req.params.postId);
    const boardId = Number(req.params.boardId);

    try {
        const post = await postService.getPost(postId, boardId);
            res.status(200).json({ 
                message: '게시물 조회 성공' , 
                data : post
            });
    } catch (error) {
        next(error);
    }
};

export const getPosts = async (
    req: Request, 
    res: Response,
    next: NextFunction
    ): Promise<void> => {

    const boardId = Number(req.params.boardId);
    const limit = Number(req.query.limit) || 20;
    const currentPage = Number(req.query.currentPage) || 1;
    
    
    try{
        await postService.checkBoard(boardId);

        const { posts, totalCount } = await postService.getPosts(boardId, limit, currentPage);
        
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
            res.status(StatusCodes.NO_CONTENT).json({ 
                message: '게시판에 등록된 게시물이 없습니다.' 
            });
        }
    } catch(error){
        next(error);
    }
};

