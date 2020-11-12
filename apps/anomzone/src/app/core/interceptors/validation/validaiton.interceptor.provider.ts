import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ValidationInterceptor } from './validation.interceptor';

export const validationInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ValidationInterceptor,
  multi: true,
};
