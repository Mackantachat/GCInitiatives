import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceInactiveComponent } from './performance-inactive.component';

describe('PerformanceInactiveComponent', () => {
  let component: PerformanceInactiveComponent;
  let fixture: ComponentFixture<PerformanceInactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceInactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
