import { TestBed } from '@angular/core/testing';

import { CimFormValidateService } from './cim-form-validate.service';

describe('CimFormValidateService', () => {
  let service: CimFormValidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CimFormValidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
