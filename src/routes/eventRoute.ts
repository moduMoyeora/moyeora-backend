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

const router = express.Router({ mergeParams: true });

router.post('/', createEventValidationRules(), validateEvent, createEvent);

router.get('/:eventId', eventParamValidationRules(), validateEvent, getEvent);

router.put(
  '/:eventId',
  updateEventValidationRules(),
  validateEvent,
  updateEvent
);

router.delete(
  '/:eventId',
  eventParamValidationRules(),
  validateEvent,
  deleteEvent
);

export default router;
