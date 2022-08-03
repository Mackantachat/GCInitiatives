import { TestBed } from '@angular/core/testing';

import { ResourceNeededService } from './resource-needed.service';

describe('ResourceNeededService', () => {
  let service: ResourceNeededService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceNeededService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
