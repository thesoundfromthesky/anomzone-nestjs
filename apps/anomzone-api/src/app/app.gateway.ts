import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import type { WsResponse } from '@nestjs/websockets';
import type {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import type { Server, WebSocket } from 'ws';
import { OPEN } from 'ws';
import { Logger, UsePipes } from '@nestjs/common';
import { convertToIp4, wsRateLimiter } from '@middleware/index';
import type { Request } from 'express';
import { v4 as uuid } from 'uuid';
import { WebSocket as WsAction } from '@ngxs/lib/websocket';
import type { Client, Message } from '@ngxs/lib/websocket';
import { webSocketServerOptions } from './websocket.server-options';
import { randomHexColor } from '@util/index';
import * as faker from 'faker';
import { MessageDto } from './message.dto';
import { WebsocketValidationPipe } from './core/pipes/websocket-validation';

@UsePipes(WebsocketValidationPipe)
@WebSocketGateway(webSocketServerOptions)
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  clients: Record<string, Client> = {};
  interval: NodeJS.Timer;
  messages: Message[] = [];

  addMessage(data: Message) {
    this.messages.push(data);
    this.messages = this.messages.slice(-30);
  }

  @WebSocketServer()
  server!: Server;
  /**
   *
   * @param data stringify your object
   * @param exclude client to exclude
   */
  broadcast(event: string, data: unknown, exclude?: WebSocket) {
    this.server.clients.forEach((client) => {
      if (client !== exclude && client.readyState === OPEN) {
        this.send(client, event, data);
      }
    });
  }

  send(client: WebSocket, event: string, data: unknown) {
    client.send(JSON.stringify({ event, data }));
  }

  afterInit(server: Server) {
    this.interval = setInterval(() => {
      Logger.log(`WebSocketServer ping`, 'WebsocketGateway');
      server.clients.forEach((ws) => {
        if (ws.state.isAlive === false) return ws.terminate();

        ws.state.isAlive = false;
        ws.ping();
      });
    }, 1000 * 30);

    server.on('close', () => {
      clearInterval(this.interval);
      Logger.log(
        `WebSocketServer closed on ${server.options.path}`,
        'WebsocketGateway'
      );
    });

    Logger.log(`OnGatewayInit on ${server.options.path}`, 'WebsocketGateway');
  }

  handleConnection(client: WebSocket, request: Request) {
    wsRateLimiter(client);
    const id = uuid();

    const username = faker.name.findName();
    const xIp = (request.headers['x-forwarded-for'] as string)?.split(
      /\s*,\s*/
    )[0];
    const ip = xIp || request.socket.remoteAddress;
    const createdAt = Date.now();
    const newClient: Client = {
      username,
      ip: convertToIp4(ip),
      createdAt,
      id,
      avatar: `https://ui-avatars.com/api/?background=${randomHexColor()}&color=${randomHexColor()}&name=${username}`,
      isAlive: true,
    };
    this.clients[id] = newClient;
    client.state = newClient;
    this.send(client, WsAction.Connect.type, {
      me: newClient,
      clients: this.clients,
    });
    this.send(client, WsAction.SendMessage.type, this.messages);

    this.broadcast(
      WsAction.Connect.type,
      { clients: { [id]: newClient } },
      client
    );

    const data = {
      from: 'Server',
      message: `${username} has entered.`,
      createdAt,
      id: 'server',
    };
    this.broadcast(WsAction.SendMessage.type, [data]);
    this.addMessage(data);

    Logger.log(`New connection from ${ip}`, 'WebsocketGateway');

    client.on('pong', () => {
      client.state.isAlive = true;
      Logger.log(`Client ${id} pong `, 'WebsocketGateway');
    });

    client.on('exception', (err) => {
      console.log(err);
      this.send(client, WsAction.SendMessage.type, [
        {
          from: 'Server',
          message: err.message.join(', '),
          createdAt: Date.now(),
          id: 'server',
        },
      ]);
    });

    client.on('limited', () => {
      this.send(client, WsAction.SendMessage.type, [
        {
          from: 'Server',
          message: 'limit 3 messages per 5 seconds',
          createdAt: Date.now(),
          id: 'server',
        },
      ]);
    });
  }

  handleDisconnect(client: WebSocket) {
    const data = {
      from: 'Server',
      message: `${client.state.username} has left.`,
      createdAt: Date.now(),
      id: client.state.id,
    };
    this.broadcast(WsAction.SendMessage.type, [data]);
    this.addMessage(data);

    delete this.clients[client.state.id];
    this.broadcast(WsAction.Disconnect.type, client.state.id);
    Logger.warn(`Disconnected client ${client.state.id}`, 'WebsocketGateway');
  }

  @SubscribeMessage(WsAction.SendMessage.type)
  handleMessage(
    @MessageBody() data: MessageDto,
    @ConnectedSocket() client: WebSocket
  ): WsResponse<Message[]> {
    data.from = client.state.username;
    data.createdAt = Date.now();
    data.id = client.state.id;
    this.addMessage(data);

    this.broadcast(WsAction.SendMessage.type, [data], client);

    return {
      event: WsAction.SendMessage.type,
      data: [data],
    };
  }
}
