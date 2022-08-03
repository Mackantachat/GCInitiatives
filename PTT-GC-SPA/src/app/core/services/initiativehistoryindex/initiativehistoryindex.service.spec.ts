import { TestBed } from '@angular/core/testing';

import { InitiativehistoryindexService } from './initiativehistoryindex.service';

describe('InitiativehistoryindexService', () => {
  let service: InitiativehistoryindexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitiativehistoryindexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
