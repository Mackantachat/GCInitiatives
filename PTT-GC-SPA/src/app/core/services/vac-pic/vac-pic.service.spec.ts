/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VacPicService } from './vac-pic.service';

describe('Service: VacPac', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VacPicService]
    });
  });

  it('should ...', inject([VacPicService], (service: VacPicService) => {
    expect(service).toBeTruthy();
  }));
});
