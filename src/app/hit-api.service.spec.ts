import { TestBed } from '@angular/core/testing';

import { HitApiService } from './hit-api.service';

describe('HitApiService', () => {
  let service: HitApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HitApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
