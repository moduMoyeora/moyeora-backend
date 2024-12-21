import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../config/db';
import { CreateEventDto } from '../types/interface/eventInterface';
import { Event } from '../types/interface/eventInterface';
import { NotFoundError } from '../errors/httpError';

export const create = async (
  postId: number,
  data: CreateEventDto
): Promise<Event> => {
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO event (post_id, location, event_time) VALUES (?, ?, ?);',
    [postId, data.location, new Date(data.time)]
  );

  const [events] = await pool.query<Event[]>(
    'SELECT * FROM event WHERE id = ?',
    [result.insertId]
  );

  return events[0];
};

export const findById = async (eventId: number): Promise<Event> => {
  const [events] = await pool.query<Event[]>(
    'SELECT * FROM event WHERE id = ? LIMIT 1',
    [eventId]
  );

  if (events.length === 0) {
    throw new NotFoundError();
  }

  return events[0];
};

export const findByPostId = async (postId: number): Promise<Event> => {
  const [events] = await pool.query<Event[]>(
    'SELECT * FROM event WHERE post_id = ? LIMIT 1',
    [postId]
  );

  if (events.length === 0) {
    throw new NotFoundError();
  }

  return events[0];
};

export const update = async (
  eventId: number,
  data: CreateEventDto
): Promise<Event> => {
  const [result] = await pool.query<ResultSetHeader>(
    'UPDATE event SET location = ?, event_time = ? WHERE id = ?',
    [data.location, new Date(data.time), eventId]
  );

  if (result.affectedRows === 0) {
    throw new NotFoundError();
  }

  const [events] = await pool.query<Event[]>(
    'SELECT * FROM event WHERE id = ?',
    [eventId]
  );

  return events[0];
};

export const deleteById = async (eventId: number): Promise<void> => {
  const [result] = await pool.query<ResultSetHeader>(
    'DELETE FROM event WHERE id = ?',
    [eventId]
  );

  if (result.affectedRows === 0) {
    throw new NotFoundError();
  }
};

export const findUserByCommentId = async (
  commentId: number
): Promise<number> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT member_id FROM comment WHERE id = ?',
    [commentId]
  );
  const result = rows[0] as { member_id: number };
  return result.member_id;
};
