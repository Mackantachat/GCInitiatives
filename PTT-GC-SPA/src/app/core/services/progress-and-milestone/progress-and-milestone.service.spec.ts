import { TestBed } from '@angular/core/testing';

import { ProgressAndMilestoneService } from './progress-and-milestone.service';

describe('ProgressAndMilestoneService', () => {
  let service: ProgressAndMilestoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressAndMilestoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
