import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as RateLimit from 'express-rate-limit';
// import * as RedisStore from 'rate-limit-redis';
import type { NextFunction, Request, Response } from 'express';
import { ApiConfigService } from './app/core/config';
import { NodeEnv } from '@config/index';
import { WsAdapter } from '@nestjs/platform-ws';
import * as sslRedirect from 'heroku-ssl-redirect';
import { csurf, cookieParser } from '@middleware/index';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // cors: true,
    logger: true,
  });

  const apiConfigService = app.get<ApiConfigService>(ApiConfigService);
  app.useWebSocketAdapter(new WsAdapter(app));

  const { globalPrefix, host } = apiConfigService.get('application');
  app.setGlobalPrefix(globalPrefix);

  const { mode } = apiConfigService.get('node_env');

  const corsOptionLookupTable = {
    [NodeEnv.Development]: () => undefined,
    [NodeEnv.Local]: () => {
      return undefined;
    },
    [NodeEnv.Production]: () => {
      app.use(csurf);

      return {
        origin: [`https://${host}`],
      };
    },
  };
  
  app.use(sslRedirect.default([NodeEnv.Production], 301));
  app.use(cookieParser);
  app.enableCors(corsOptionLookupTable[mode]());
  app.use(compression());
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  const express = app.getHttpAdapter().getInstance();
  // Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // see https://expressjs.com/en/guide/behind-proxies.html
  express.set('trust proxy', true);

  /** Two things to cover
   * 1. Does path start with /api?
   * 2. Does path contain . ? having . in path we assume it's requesting file.
   */
  const regExp = new RegExp(`^/${globalPrefix}.*`);
  express.all('*', (req: Request, res: Response, next: NextFunction) => {
    if (!regExp.test(req.path) && !req.path.includes('.')) {
      res.cookie('XSRF-TOKEN', req.csrfToken());
    }
    next();
  });

  // Redis Rate limit
  // const { url } = apiConfigService.get('redis');
  // const apiLimiter = new (RateLimit as any)({
  //   store: new (RedisStore as any)({
  //     expiry: 60,
  //     redisURL: url,
  //   } as RedisStore.Options),
  //   max: 120, // limit each IP to 120 requests per windowMs
  //   //, delayMs: 0 // disable delaying - full speed until the max limit is reached
  // } as RateLimit.Options);

  // Express Rate Limit
  const apiLimiter = RateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 120, // limit each IP to 120 requests per windowMs
  });
  app.use('/' + globalPrefix, apiLimiter);

  const port = process.env.PORT || apiConfigService.get('application').port;

  // Setting hardcoded port will cause error in development mode
  // Make sure to put process.env.PORT angular will assign dev port automatically and we have to go with that port during development
  await app.listen(port);

  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
