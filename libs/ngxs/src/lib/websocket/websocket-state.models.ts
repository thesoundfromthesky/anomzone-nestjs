import { StateToken } from '@ngxs/store';

export interface Client {
  username: string;
  ip: string;
  createdAt: number;
  id: string;
  avatar: string;
  isAlive: boolean;
}

export interface Message {
  from: string;
  message: string;
  createdAt: number;
  id: string;
}

export type Clients = Record<string, Client>;
export type ClientsList = [Client[], number];

export interface WebSocketStateModel {
  me: Client;
  clients: Clients;
  messages: Message[];
}

export const WEBSOCKET_STATE_TOKEN = new StateToken<WebSocketStateModel>(
  'websocket'
);
