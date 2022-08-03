import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookbackPerformanceComponent } from './lookback-performance.component';

describe('LookbackPerformanceComponent', () => {
  let component: LookbackPerformanceComponent;
  let fixture: ComponentFixture<LookbackPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookbackPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookbackPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
