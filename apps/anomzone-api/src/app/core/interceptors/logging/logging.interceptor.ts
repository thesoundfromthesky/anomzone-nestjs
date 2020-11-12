import { Injectable, Logger } from '@nestjs/common';
import type {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import type { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp();
    const { method, url } = ctx.getRequest<Request>();
    const past = Date.now();

    return next.handle().pipe(
      tap(() => {
        Logger.log(
          `${method} ${url} ${Date.now() - past}ms`,
          context.getClass().name
        );
      })
    );
  }
}
