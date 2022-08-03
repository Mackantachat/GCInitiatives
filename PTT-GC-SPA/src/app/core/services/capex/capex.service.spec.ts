import { TestBed } from '@angular/core/testing';

import { CapexService } from './capex.service';

describe('CapexService', () => {
  let service: CapexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
