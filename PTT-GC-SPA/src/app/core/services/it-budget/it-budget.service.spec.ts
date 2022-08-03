import { TestBed } from '@angular/core/testing';

import { ItBudgetService } from './it-budget.service';

describe('ItBudgetService', () => {
  let service: ItBudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItBudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
