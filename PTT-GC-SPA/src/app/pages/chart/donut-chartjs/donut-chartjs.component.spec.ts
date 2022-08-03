import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutChartjsComponent } from './donut-chartjs.component';

describe('DonutChartjsComponent', () => {
  let component: DonutChartjsComponent;
  let fixture: ComponentFixture<DonutChartjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonutChartjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutChartjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
