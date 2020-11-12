import type { Client } from '@ngxs/index';
import type * as ws from 'ws';

export {};

declare module 'ws' {
  export interface WebSocket extends ws {
    state: Client;
  }
}
