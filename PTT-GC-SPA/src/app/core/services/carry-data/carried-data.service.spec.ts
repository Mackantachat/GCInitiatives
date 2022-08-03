import { TestBed } from '@angular/core/testing';

import { CarriedDataService } from './carried-data.service';

describe('CarriedDataService', () => {
  let service: CarriedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarriedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
