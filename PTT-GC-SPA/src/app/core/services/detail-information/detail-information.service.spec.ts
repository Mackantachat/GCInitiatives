import { TestBed } from '@angular/core/testing';

import { DetailInformationService } from './detail-information.service';

describe('DetailInformationService', () => {
  let service: DetailInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
