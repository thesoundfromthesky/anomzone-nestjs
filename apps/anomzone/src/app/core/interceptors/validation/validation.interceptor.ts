import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouterService } from '../../util';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { isNumber } from '@util';

@Injectable()
export class ValidationInterceptor implements HttpInterceptor {
  constructor(private readonly routerService: RouterService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const page = request.params.get('page');
    if (page) {
      const number = +page;
      if (!isNumber(number) || number < 1) {
        const errorResponse = {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: 'Page must be greater than 1',
          method: request.method,
          path: request.urlWithParams,
          platform: 'client',
          timestamp: new Date().toLocaleString(),
        };

        const httpException = new HttpException(
          errorResponse,
          HttpStatus.BAD_REQUEST
        );
        this.routerService.toNotFound();
        throw httpException;
      }
    }
    return next.handle(request);
  }
}
