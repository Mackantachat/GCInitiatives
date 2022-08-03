import { TestBed } from '@angular/core/testing';

import { LessonLearnApiService } from './lesson-learn-api.service';

describe('LessonLearnApiService', () => {
  let service: LessonLearnApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonLearnApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
