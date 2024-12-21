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
  authOnlyLoggedIn,
  authWithCommentId,
} from '../middlewares/authMiddleware';

const router = express.Router({ mergeParams: true });

router.post(
  '/',
  authOnlyLoggedIn,
  createCommentValidationRules(),
  validateComment,
  createComment
);

router.get(
  '/',
  authOnlyLoggedIn,
  commentParamValidationRules(),
  validateComment,
  getComment
);

router.put(
  '/:commentId',
  authOnlyLoggedIn,
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
