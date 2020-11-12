import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingFacadeService } from '@ngxs/lib/loading';
import { skip, tap } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private readonly loadingFacadeService: LoadingFacadeService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadingFacadeService.dispatchLoadingStart$();

    return next.handle(request).pipe(
      skip(1),
      tap(() => {
        this.loadingFacadeService.dispatchLoadingFinish$();
      })
    );
  }
}
