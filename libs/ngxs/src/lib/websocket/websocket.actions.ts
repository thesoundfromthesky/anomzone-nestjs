import { WEBSOCKET_STATE_TOKEN } from './websocket-state.models';
import type { Clients, Client, Message } from './websocket-state.models';
const prefix = `[${WEBSOCKET_STATE_TOKEN.getName()}]`;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace WebSocket {
  export class Connect {
    static readonly type = `${prefix} Connect a Client`;
    constructor(public readonly data: { me: Client; clients: Clients }) {}
  }

  export class Disconnect {
    static readonly type = `${prefix} Disconnect a Client`;
    constructor(public readonly data: string) {}
  }

  export class SendMessage {
    static readonly type = `${prefix} Send a message`;
    constructor(public readonly data: Message[]) {}
  }
}
