import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { WebSocketSelectors } from './websocket.selectors';
import { SendWebSocketMessage } from '@ngxs/websocket-plugin';
import { WebSocket } from './websocket.actions';
import type { Message } from './websocket-state.models';

@Injectable({
  providedIn: 'root',
})
export class WebSocketFacadeService {
  constructor(private readonly store: Store) {}

  selectWebSocketState$() {
    return this.store.select(WebSocketSelectors.state());
  }


  selectWebSocketClients$() {
    return this.store.select(WebSocketSelectors.clients());
  }

  selectWebSocketMe$() {
    return this.store.select(WebSocketSelectors.me());
  }

  selectWebSocketMessages$() {
    return this.store.select(WebSocketSelectors.messages());
  }

  dispatchWebSocketSendMessage$(data: Message) {
    return this.store.dispatch(
      new SendWebSocketMessage({
        event: WebSocket.SendMessage.type,
        data,
      })
    );
  }
}
