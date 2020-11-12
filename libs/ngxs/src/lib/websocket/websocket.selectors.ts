import { WEBSOCKET_STATE_TOKEN } from './websocket-state.models';
import type {
  ClientsList,
  WebSocketStateModel,
  Message,
  Client,
} from './websocket-state.models';
import { createSelector } from '@ngxs/store';

export class WebSocketSelectors {
  static state() {
    return createSelector(
      [WEBSOCKET_STATE_TOKEN],
      (webSocketState: WebSocketStateModel): WebSocketStateModel => {
        return webSocketState;
      }
    );
  }

  static clients() {
    return createSelector(
      [WEBSOCKET_STATE_TOKEN],
      (webSocketState: WebSocketStateModel): ClientsList => {
        const clients = Object.values(webSocketState.clients);
        return [clients, clients.length];
      }
    );
  }

  static me() {
    return createSelector(
      [WEBSOCKET_STATE_TOKEN],
      (webSocketState: WebSocketStateModel): Client => {
        return webSocketState.me;
      }
    );
  }

  static messages() {
    return createSelector(
      [WEBSOCKET_STATE_TOKEN],
      (webSocketState: WebSocketStateModel): Message[] => {
        return webSocketState.messages;
      }
    );
  }
}
