import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartjsComponent } from './pie-chartjs.component';

describe('PieChartjsComponent', () => {
  let component: PieChartjsComponent;
  let fixture: ComponentFixture<PieChartjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieChartjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
