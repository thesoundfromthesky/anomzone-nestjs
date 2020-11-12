import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from './timeout.interceptor';

export const timeoutInterceptorProvider = {
  provide: APP_INTERCEPTOR,
  useClass: TimeoutInterceptor,
};
