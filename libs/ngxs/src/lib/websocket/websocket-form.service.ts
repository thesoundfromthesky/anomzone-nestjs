import { Injectable } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import { FormService } from '@ng-util/index';
import { take } from 'rxjs/operators';
import { WebSocketFacadeService } from './websocket-facade.service';
import type { Message } from './websocket-state.models';

@Injectable({
  providedIn: 'root',
})
export class WebSocketFormService {
  constructor(
    private readonly formService: FormService,
    private readonly webSocketFacadeService: WebSocketFacadeService
  ) {}

  getWebSocketForm(message?: Message): FormGroup {
    const webSocketForm = this.formService.buildForm('websocket', message);
    return webSocketForm;
  }

  onSend(webSocketForm: FormGroup) {
    webSocketForm.markAllAsTouched();

    if (webSocketForm.valid) {
      this.webSocketFacadeService
        .dispatchWebSocketSendMessage$(webSocketForm.value)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.onReset(webSocketForm, { message: '' } as Message);
          },
        });
    }
  }

  onReset(webSocketForm: FormGroup, message?: Message) {
    webSocketForm.reset(message);
  }
}
