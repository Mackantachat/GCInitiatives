import { TestBed } from '@angular/core/testing';

import { CarriedApiService } from './carried-api.service';

describe('CarriedApiService', () => {
  let service: CarriedApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarriedApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
