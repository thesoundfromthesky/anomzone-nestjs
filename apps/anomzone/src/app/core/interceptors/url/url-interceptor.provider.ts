import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlInterceptor } from './url.interceptor';

export const urlInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: UrlInterceptor,
  multi: true,
};
