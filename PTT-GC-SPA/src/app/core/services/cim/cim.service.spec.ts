import { TestBed } from '@angular/core/testing';

import { CimService } from './cim.service';

describe('CimService', () => {
  let service: CimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
