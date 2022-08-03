import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiKriIndicatorComponent } from './kpi-kri-indicator.component';

describe('KpiKriIndicatorComponent', () => {
  let component: KpiKriIndicatorComponent;
  let fixture: ComponentFixture<KpiKriIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiKriIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiKriIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
