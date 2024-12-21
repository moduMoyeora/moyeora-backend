import { RowDataPacket } from 'mysql2';

export interface CreateEventDto {
  location: string;
  time: string;
}

export interface Event extends RowDataPacket {
  id: number;
  post_id: number;
  location: string;
  event_time: string;
}

export interface EmailRequestBody {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}
