import { TestBed } from '@angular/core/testing';

import { LookbackService } from './lookback.service';

describe('LookbackService', () => {
  let service: LookbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LookbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
