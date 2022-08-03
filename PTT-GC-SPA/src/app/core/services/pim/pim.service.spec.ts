import { TestBed } from '@angular/core/testing';

import { PimService } from './pim.service';

describe('PimService', () => {
  let service: PimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
