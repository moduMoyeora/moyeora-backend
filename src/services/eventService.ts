import { ForbiddenError } from '../errors/httpError';
import * as eventModel from '../models/eventModel';
import * as postModel from '../models/postModel';
import { CreateEventDto, Event } from '../types/interface/eventInterface';

export const createEvent = async (
  boardId: number,
  postId: number,
  memberId: number,
  eventData: CreateEventDto
): Promise<Event> => {
  const post = await postModel.getPostById(postId, boardId);

  if (post.member_id !== memberId) {
    throw new ForbiddenError();
  }

  const event = await eventModel.create(postId, eventData);
  await postModel.updateStatus(postId, 'published');

  return event;
};

export const getEvent = async (eventId: number): Promise<Event> => {
  const event = await eventModel.findById(eventId);

  return event;
};

export const updateEvent = async (
  eventId: number,
  eventData: CreateEventDto
): Promise<Event> => {
  const event = await eventModel.update(eventId, eventData);

  return event;
};

export const deleteEvent = async (eventId: number): Promise<void> => {
  await eventModel.deleteById(eventId);
};
