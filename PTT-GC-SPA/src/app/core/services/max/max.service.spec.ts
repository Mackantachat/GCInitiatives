import { TestBed } from '@angular/core/testing';

import { MaxService } from './max.service';

describe('MaxService', () => {
  let service: MaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
