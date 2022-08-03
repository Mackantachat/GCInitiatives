import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PimGate1Component } from './pim-gate1.component';

describe('PimGate1Component', () => {
  let component: PimGate1Component;
  let fixture: ComponentFixture<PimGate1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PimGate1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PimGate1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
