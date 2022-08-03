import { TestBed } from '@angular/core/testing';

import { KpiKriApiService } from './kpi-kri-api.service';

describe('KpiKriApiService', () => {
  let service: KpiKriApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KpiKriApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
