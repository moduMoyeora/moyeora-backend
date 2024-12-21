import express from 'express';
import {
  sendEmailValidationRules,
  validateEvent,
} from '../validators/eventValidator';
import { sendEmail } from '../controllers/eventController';
import { authWithPostId } from '../middlewares/authMiddleware';

const router = express.Router({ mergeParams: true });

router.post(
  '/',
  authWithPostId,
  sendEmailValidationRules(),
  validateEvent,
  sendEmail
);

export default router;
