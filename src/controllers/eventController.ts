import { NextFunction, Request, Response } from 'express';
import * as eventService from '../services/eventService';

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const boardId = Number(req.params.boardId);
    const postId = Number(req.params.postId);
    const memberId = 1;
    const eventData = req.body;

    const event = await eventService.createEvent(
      boardId,
      postId,
      memberId,
      eventData
    );
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const eventId = Number(req.params.eventId);
  const eventData = req.body;

  try {
    const event = await eventService.updateEvent(eventId, eventData);
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const eventId = Number(req.params.eventId);

  try {
    await eventService.deleteEvent(eventId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const getEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const eventId = Number(req.params.eventId);

  try {
    const event = await eventService.getEvent(eventId);
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};
