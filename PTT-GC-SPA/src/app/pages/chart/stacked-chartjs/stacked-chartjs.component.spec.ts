import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedChartjsComponent } from './stacked-chartjs.component';

describe('StackedChartjsComponent', () => {
  let component: StackedChartjsComponent;
  let fixture: ComponentFixture<StackedChartjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackedChartjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedChartjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
