import { TestBed } from '@angular/core/testing';

import { CpiService } from './cpi.service';

describe('CpiService', () => {
  let service: CpiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
