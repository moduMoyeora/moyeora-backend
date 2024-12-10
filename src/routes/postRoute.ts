import express from 'express';
import { getPostByIdController, getPostsByBoardIdController } from '../controllers/postController';
import { validateGetPostById, validateGetPostsByBoardId } from '../validators/postValidator';
import { validateRequest } from '../validators/validateRequest';

const router = express.Router({mergeParams: true});

router.get('/:id',  validateGetPostById, validateRequest, getPostByIdController);

router.get('/', validateGetPostsByBoardId, validateRequest, getPostsByBoardIdController);

export default router;