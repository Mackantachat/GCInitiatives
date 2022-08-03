import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainAndSettingComponent } from './maintain-and-setting.component';

describe('MaintainAndSettingComponent', () => {
  let component: MaintainAndSettingComponent;
  let fixture: ComponentFixture<MaintainAndSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainAndSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainAndSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
