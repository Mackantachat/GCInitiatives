import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PimGate3Component } from './pim-gate3.component';

describe('PimGate3Component', () => {
  let component: PimGate3Component;
  let fixture: ComponentFixture<PimGate3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PimGate3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PimGate3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
