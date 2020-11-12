import { TestBed } from '@angular/core/testing';

import { WebSocketFormService } from './websocket-form.service';

describe('WebsocketFormService', () => {
  let service: WebSocketFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSocketFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
