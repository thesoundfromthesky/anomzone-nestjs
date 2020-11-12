import { classSerializerInterceptorProvider } from './class-serializer';
import { loggingInterceptorProvider } from './logging';
import { timeoutInterceptorProvider } from './timeout';

// interceptor order starts from top to bottom
export const interceptorProviders = [
  timeoutInterceptorProvider,
  classSerializerInterceptorProvider,
  loggingInterceptorProvider,
];
