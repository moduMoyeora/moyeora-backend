import express from 'express';
import {
  createEventValidationRules,
  validateEvent,
} from '../validators/eventValidator';
import {
  createEvent,
  deleteEvent,
  getEvent,
  updateEvent,
} from '../controllers/eventController';
import { authWithPostId } from '../middlewares/authMiddleware';
import { postParamValidationRules } from '../validators/postValidator';

const router = express.Router({ mergeParams: true });

router.post(
  '/',
  authWithPostId,
  createEventValidationRules(),
  validateEvent,
  createEvent
);

router.get(
  '/',
  authWithPostId,
  postParamValidationRules(),
  validateEvent,
  getEvent
);

router.put(
  '/',
  authWithPostId,
  postParamValidationRules(),
  validateEvent,
  updateEvent
);

router.delete(
  '/',
  authWithPostId,
  postParamValidationRules(),
  validateEvent,
  deleteEvent
);

export default router;
