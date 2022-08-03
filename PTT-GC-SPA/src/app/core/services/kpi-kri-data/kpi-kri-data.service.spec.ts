import { TestBed } from '@angular/core/testing';

import { KpiKriDataService } from './kpi-kri-data.service';

describe('KpiKriDataService', () => {
  let service: KpiKriDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KpiKriDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
