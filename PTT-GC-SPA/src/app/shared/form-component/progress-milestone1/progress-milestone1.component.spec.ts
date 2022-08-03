import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressMilestone1Component } from './progress-milestone1.component';

describe('ProgressMilestone1Component', () => {
  let component: ProgressMilestone1Component;
  let fixture: ComponentFixture<ProgressMilestone1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressMilestone1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressMilestone1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
