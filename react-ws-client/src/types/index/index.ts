interface User {
  username: string | string[] | undefined;
  state: Message;
}
import { UUID } from 'crypto';

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
