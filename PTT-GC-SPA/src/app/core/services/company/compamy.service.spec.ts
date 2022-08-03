import { TestBed } from '@angular/core/testing';

import { CompamyService } from './compamy.service';

describe('CompamyService', () => {
  let service: CompamyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompamyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
