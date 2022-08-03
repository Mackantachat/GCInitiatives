import { TestBed } from '@angular/core/testing';

import { CustomreportService } from './customreport.service';

describe('CustomreportService', () => {
  let service: CustomreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
