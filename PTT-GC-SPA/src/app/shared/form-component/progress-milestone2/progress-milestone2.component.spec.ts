import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressMilestone2Component } from './progress-milestone2.component';

describe('ProgressMilestone2Component', () => {
  let component: ProgressMilestone2Component;
  let fixture: ComponentFixture<ProgressMilestone2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressMilestone2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressMilestone2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
