import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookbackExecutionComponent } from './lookback-execution.component';

describe('LookbackExecutionComponent', () => {
  let component: LookbackExecutionComponent;
  let fixture: ComponentFixture<LookbackExecutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookbackExecutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookbackExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
