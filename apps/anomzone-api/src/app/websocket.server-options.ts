import type { OutgoingHttpHeaders } from 'http';
import { Logger } from '@nestjs/common';
import { csurf, cookieParser } from '@middleware/index';
import type { Request } from 'express';
import { NodeEnv } from '@config/index';
import type { ServerOptions } from 'ws';

export const webSocketServerOptions: ServerOptions = {
  path: '/ws',
  verifyClient: (
    {
      req: request,
      origin,
    }: {
      origin: string;
      secure: boolean;
      req: Request;
    },
    callback: (
      res: boolean,
      code?: number,
      message?: string,
      headers?: OutgoingHttpHeaders
    ) => void
  ) => {
    // Cross origin check
    if (process.env['NODE' + '_ENV'] === NodeEnv.Production) {
      const host = `https://${process.env.APPLICATION_HOST}`;
      if (origin !== host) {
        Logger.error(
          `Websocket handshake fail, ${origin} !== ${host}`,
          undefined,
          'WebsocketGateway'
        );
        callback(false);
        return;
      }

      // Apply CookieParser we need this to run csurf because we enabled cookie mode
      cookieParser(request, undefined, () => undefined);
      request.method = 'POST';
      request.headers['xsrf-token'] = request.cookies['XSRF-TOKEN'];

      // Manually run csurf to verify XSRF-TOKEN;
      try {
        csurf(request, undefined, (arg) => {
          if (arg) {
            Logger.error(
              `Websocket handshake fail for ${origin}`,
              arg,
              'WebsocketGateway'
            );
            callback(false);
          } else {
            Logger.log(
              `Websocket upgrade success for ${origin}`,
              'WebsocketGateway'
            );
            callback(true);
          }
        });
      } catch (err) {
        Logger.error(
          `Websocket handshake fail for ${origin}`,
          err,
          'WebsocketGateway'
        );
        callback(false);
      }
    } else {
      callback(true);
    }
  },
};
