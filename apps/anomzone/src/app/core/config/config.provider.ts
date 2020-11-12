import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DocumentService } from '@ng-util/index';
import { ConfigService } from './config.service';
import { environment } from '@client/environments/environment';

// https://angular.io/guide/dependency-injection-providers#predefined-tokens-and-multiple-providers
function configFactory(
  http: HttpClient,
  configService: ConfigService,
  documentService: DocumentService
) {
  return () => {
    return new Promise<boolean>((resolve, reject) => {
      // reqresService.isPlatformServer(() => {
      //   console.log('Server', documentService.getOrigin());
      // });
      // reqresService.isPlatformBrowser(() => {
      //   console.log('Browser', documentService.getOrigin());
      // });
      resolve();
      // http
      //   .get('/config')
      //   .pipe(
      //     tap((res: any) => {
      //       configService.applicationConfig = res;
      //       resolve();
      //     })
      //   )
      //   .subscribe({
      //     error: (err) => reject('Initialize Failed'),
      //   });
    });
  };
}

export const configProvider = {
  provide: APP_INITIALIZER,
  useFactory: configFactory,
  deps: [HttpClient, ConfigService, DocumentService],
  multi: true,
};
