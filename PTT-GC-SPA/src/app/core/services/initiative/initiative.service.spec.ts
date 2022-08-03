import { TestBed } from '@angular/core/testing';

import { InitiativeService } from './initiative.service';

describe('InitiativesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitiativeService = TestBed.get(InitiativeService);
    expect(service).toBeTruthy();
  });
});
