import { TestBed } from '@angular/core/testing';

import { LessonLearnTableDataService } from './lesson-learn-table-data.service';

describe('LessonLearnTableDataService', () => {
  let service: LessonLearnTableDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonLearnTableDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
