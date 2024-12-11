import express from 'express';
import { getPost, getPosts } from '../controllers/postController';
import { getPostByIdValidationrules, getPostsByBoardIdValidationRules, validatePost } from '../validators/postValidator';

const router = express.Router({mergeParams: true});

router.get('/:postId',  getPostByIdValidationrules(), validatePost, getPost);

router.get('/', getPostsByBoardIdValidationRules(), validatePost, getPosts);

export default router;