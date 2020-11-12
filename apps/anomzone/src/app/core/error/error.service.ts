import { Injectable, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { MessageService } from '@ng-util/index';
import type { Message } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorService implements ErrorHandler {
  prevError: any;
  // https://indepth.dev/how-to-avoid-angular-injectable-instances-duplication/
  constructor(
    private readonly ms: MessageService,
    @Optional() @SkipSelf() parentModule?: ErrorService
  ) {
    if (parentModule) {
      throw Error(
        `[ErrorService]: trying to create multiple instances,
        but this service should be a singleton.`
      );
    }
  }

  handleError(err: any) {
    // if ('rejection' in err) {
    //   err = err.rejection;
    // }

    // NGXS fires error twice when dispatch is subscribed
    // This should prevent duplicate logging
    if (HttpErrorResponse.name === err.name) {
      if (this.prevError === err) {
        this.prevError = undefined;
        return;
      }
      console.log("http error");
      this.prevError = err;
      return;
    }

    const msg: Message = {
      severity: 'error',
      summary: err.name,
      detail: err.toString(),
    };

    this.ms.add(msg);

    console.error(err.name, err);
  }
}
