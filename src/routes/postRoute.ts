import express from 'express';
import {
  createPost,
  deletePost,
  updatePost,
  getPost,
  getPosts,
} from '../controllers/postController';
import {
  createPostValidationRules,
  postParamValidationRules,
  updatePostValidationRules,
  getPostByIdValidationrules,
  getPostsByBoardIdValidationRules,
  validatePost,
} from '../validators/postValidator';
import {
  authWithPostId,
  authOnlyLoggedIn,
} from '../middlewares/authMiddleware';

const router = express.Router({ mergeParams: true });

router.post(
  '/',
  authOnlyLoggedIn,
  createPostValidationRules(),
  validatePost,
  createPost
);

router.put(
  '/:postId',
  authWithPostId,
  updatePostValidationRules(),
  validatePost,
  updatePost
);

router.delete(
  '/:postId',
  authWithPostId,
  postParamValidationRules(),
  validatePost,
  deletePost
);

router.get('/:postId', getPostByIdValidationrules(), validatePost, getPost);

router.get('/', getPostsByBoardIdValidationRules(), validatePost, getPosts);

export default router;
