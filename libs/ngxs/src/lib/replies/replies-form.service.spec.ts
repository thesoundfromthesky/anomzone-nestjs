import { TestBed } from '@angular/core/testing';

import { RepliesFormService } from './replies-form.service';

describe('RepliesFormService', () => {
  let service: RepliesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepliesFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
