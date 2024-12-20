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

const router = express.Router({ mergeParams: true });

router.post('/', createCommentValidationRules(), validateComment, createComment);

router.get('/', commentParamValidationRules(), validateComment, getComment);

router.put(
  '/:commentId',
  updateCommentValidationRules(),
  validateComment,
  updateComment
);

router.delete(
  '/:commentId',
  commentParamValidationRules(),
  validateComment,
  deleteComment
);

export default router;
