import { TestBed } from '@angular/core/testing';

import { SettingAndMaintainService } from './setting-and-maintain.service';

describe('SettingAndMaintainService', () => {
  let service: SettingAndMaintainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingAndMaintainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
