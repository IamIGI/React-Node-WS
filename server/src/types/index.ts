import { UUID } from 'crypto';
import { WebSocket } from 'ws';

export type WebSocketMap = {
  [key: UUID]: WebSocket;
};

export interface UserMap {
  [key: UUID]: User;
}

interface User {
  username: string | string[] | undefined;
  state: Message;
}

export interface Message {
  x: number;
  y: number;
}
