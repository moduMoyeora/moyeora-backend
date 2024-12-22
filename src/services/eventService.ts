import { NotFoundError } from '../errors/httpError';
import * as eventModel from '../models/eventModel';
import * as postModel from '../models/postModel';
import { CreateEventDto, Event } from '../types/interface/eventInterface';

export const createEvent = async (
  boardId: number,
  postId: number,
  eventData: CreateEventDto
): Promise<Event> => {
  const event = await eventModel.create(postId, eventData);
  await postModel.updateStatus(postId, 'published');

  return event;
};

export const getEvent = async (postId: number): Promise<Event> => {
  const event = await eventModel.findByPostId(postId);
  if (!event) {
    throw new NotFoundError();
  }

  return event;
};

export const updateEvent = async (
  postId: number,
  eventData: CreateEventDto
): Promise<Event> => {
  const event = await eventModel.updateByPostId(postId, eventData);

  return event;
};

export const deleteEvent = async (postId: number): Promise<void> => {
  await eventModel.deleteByPostId(postId);
};
