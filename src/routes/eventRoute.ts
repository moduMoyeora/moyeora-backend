import express from 'express';
import {
  createEventValidationRules,
  eventParamValidationRules,
  updateEventValidationRules,
  validateEvent,
} from '../validators/eventValidator';
import {
  createEvent,
  deleteEvent,
  getEvent,
  updateEvent,
} from '../controllers/eventController';
import { authWithPostId } from '../middlewares/authMiddleware';

const router = express.Router({ mergeParams: true });

router.post(
  '/',
  authWithPostId,
  createEventValidationRules(),
  validateEvent,
  createEvent
);

router.get(
  '/:eventId',
  authWithPostId,
  eventParamValidationRules(),
  validateEvent,
  getEvent
);

router.put(
  '/:eventId',
  authWithPostId,
  updateEventValidationRules(),
  validateEvent,
  updateEvent
);

router.delete(
  '/:eventId',
  authWithPostId,
  eventParamValidationRules(),
  validateEvent,
  deleteEvent
);

export default router;
