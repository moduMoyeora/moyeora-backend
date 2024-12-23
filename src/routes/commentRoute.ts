import express from 'express';
import {
  createCommentValidationRules,
  commentParamValidationRules,
  updateCommentValidationRules,
  validateComment,
} from '../validators/commentValidator';
import {
  createComment,
  deleteComment,
  getComment,
  updateComment,
} from '../controllers/commentController';
import {
  authWithCommentId,
  authOnlyLoggedIn,
} from '../middlewares/authMiddleware';

const router = express.Router({ mergeParams: true });

router.post(
  '/',
  authOnlyLoggedIn,
  createCommentValidationRules(),
  validateComment,
  createComment
);

router.get('/', commentParamValidationRules(), validateComment, getComment);

router.put(
  '/:commentId',
  authWithCommentId,
  updateCommentValidationRules(),
  validateComment,
  updateComment
);

router.delete(
  '/:commentId',
  authWithCommentId,
  commentParamValidationRules(),
  validateComment,
  deleteComment
);

export default router;
