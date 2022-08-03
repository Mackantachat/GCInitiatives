import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PimGate2Component } from './pim-gate2.component';

describe('PimGate2Component', () => {
  let component: PimGate2Component;
  let fixture: ComponentFixture<PimGate2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PimGate2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PimGate2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
