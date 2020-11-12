import { httpErrorInterceptorProvider } from './http-error';
import { loadingInterceptorProvider } from './loading';
import { urlInterceptorProvider } from './url';
// import { validationInterceptorProvider } from './validation';

export const interceptorProviders = [
  // validationInterceptorProvider,
  loadingInterceptorProvider,
  urlInterceptorProvider,
  httpErrorInterceptorProvider,
];
