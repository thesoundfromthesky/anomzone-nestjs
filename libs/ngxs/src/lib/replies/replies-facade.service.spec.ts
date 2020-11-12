import { TestBed } from '@angular/core/testing';

import { RepliesFacadeService } from './replies-facade.service';

describe('RepliesFacadeService', () => {
  let service: RepliesFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepliesFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
