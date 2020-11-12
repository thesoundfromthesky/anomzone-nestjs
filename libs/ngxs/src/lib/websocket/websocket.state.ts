import { Injectable } from '@angular/core';
import {
  State,
  Action,
  StateContext,
  Actions,
  ofActionDispatched,
} from '@ngxs/store';
import type { NgxsAfterBootstrap } from '@ngxs/store';
import { WEBSOCKET_STATE_TOKEN } from './websocket-state.models';
import type { Client, Clients } from './websocket-state.models';
import type { WebSocketStateModel } from './websocket-state.models';
import { WebSocket } from './websocket.actions';
import { append, patch } from '@ngxs/store/operators';
import { Store } from '@ngxs/store';
import {
  ConnectWebSocket,
  DisconnectWebSocket,
  WebSocketDisconnected,
} from '@ngxs/websocket-plugin';

const initialWebSocketState = {
  me: {} as Client,
  clients: {} as Clients,
  messages: [],
};

@State<WebSocketStateModel>({
  name: WEBSOCKET_STATE_TOKEN,
  defaults: initialWebSocketState,
})
@Injectable()
export class WebSocketState implements NgxsAfterBootstrap {
  constructor(private readonly store: Store, private actions$: Actions) {}

  ngxsAfterBootstrap() {
    this.store.dispatch(new ConnectWebSocket());
    this.actions$
      .pipe(ofActionDispatched(WebSocketDisconnected))
      .subscribe(() => {
        this.store.dispatch(new DisconnectWebSocket());
        setTimeout(() => {
          console.log('Reconnecting to server');
          this.store.dispatch(new ConnectWebSocket());
        }, 5000);
      });
  }

  @Action(WebSocket.Connect, { cancelUncompleted: true })
  actionWebSocketConnect$(
    { setState }: StateContext<WebSocketStateModel>,
    { data }: WebSocket.Connect
  ) {
    if (data.me) {
      setState(patch({ me: data.me, clients: patch(data.clients) }));
    } else {
      setState(patch({ clients: patch(data.clients) }));
    }
  }

  @Action(WebSocket.Disconnect, { cancelUncompleted: true })
  actionWebSocketDisconnect$(
    { setState }: StateContext<WebSocketStateModel>,
    { data }: WebSocket.Disconnect
  ) {
    setState((state) => {
      const copyState = {
        ...state,
        clients: { ...state.clients },
      };
      if (state.me.id === data) {
        copyState.me = {} as Client;
      }
      delete copyState.clients[data];
      return copyState;
    });
  }

  @Action(WebSocket.SendMessage, { cancelUncompleted: true })
  actionWebSocketSendMessage$(
    { setState }: StateContext<WebSocketStateModel>,
    { data }: WebSocket.SendMessage
  ) {
    setState(patch({ messages: append(data) }));
  }
}
