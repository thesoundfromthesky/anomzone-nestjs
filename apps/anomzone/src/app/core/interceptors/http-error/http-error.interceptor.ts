import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService, RouterService } from '@ng-util/index';
import type { Message } from 'primeng/api';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { LoadingFacadeService } from '@ngxs/lib/loading';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly routerService: RouterService,
    private readonly messageService: MessageService,
    private readonly loadingFacadeService: LoadingFacadeService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        const msg: Message = {
          severity: 'error',
          summary: err.error.error ?? err.statusText,
          detail: err.error.message ?? err.message,
        };

        this.messageService.add(msg);
        console.error(err.name, err);

        const lookupTable: Record<string, () => void> = {
          [HttpStatus.NOT_FOUND]: () => {
            this.routerService.toNotFound();
          },
          [HttpStatus.BAD_REQUEST]: () => {
            this.routerService.toNotFound();
          },
          [HttpStatus.UNAUTHORIZED]: () => {
            console.error('Unauthorized attempt');
          },
          default: () => {
            this.routerService.toNotFound();
          },
        };

        const status = err.status;
        (lookupTable[status] || lookupTable.default)();

        this.loadingFacadeService.dispatchLoadingFinish$();
        throw err;
      })
    );
  }
}
