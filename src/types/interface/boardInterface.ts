import { RowDataPacket } from 'mysql2';

export interface Board extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  is_event_enabled: boolean;
  created_at: Date;
}

export interface CheckBoardExists extends RowDataPacket {
  exists: number;
}
