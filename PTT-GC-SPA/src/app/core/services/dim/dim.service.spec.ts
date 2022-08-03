import { TestBed } from '@angular/core/testing';

import { DimService } from './dim.service';

describe('DimService', () => {
  let service: DimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
