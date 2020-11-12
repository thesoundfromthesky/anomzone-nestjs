import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';

export const loggingInterceptorProvider = {
  provide: APP_INTERCEPTOR,
  useClass: LoggingInterceptor,
};
