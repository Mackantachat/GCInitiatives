import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookbackCimComponent } from './lookback-cim.component';

describe('LookbackCimComponent', () => {
  let component: LookbackCimComponent;
  let fixture: ComponentFixture<LookbackCimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookbackCimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookbackCimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
