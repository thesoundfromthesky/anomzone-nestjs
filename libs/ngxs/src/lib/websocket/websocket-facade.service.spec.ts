import { TestBed } from '@angular/core/testing';

import { WebSocketFacadeService } from './websocket-facade.service';

describe('WebsocketFacadeService', () => {
  let service: WebSocketFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSocketFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
