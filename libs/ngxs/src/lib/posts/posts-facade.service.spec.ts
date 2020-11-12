import { TestBed } from '@angular/core/testing';

import { PostsFacadeService } from './posts-facade.service';

describe('PostsFacadeService', () => {
  let service: PostsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
