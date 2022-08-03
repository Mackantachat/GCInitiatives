import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PimGate4Component } from './pim-gate4.component';

describe('PimGate4Component', () => {
  let component: PimGate4Component;
  let fixture: ComponentFixture<PimGate4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PimGate4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PimGate4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
