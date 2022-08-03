import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboChartjsComponent } from './combo-chartjs.component';

describe('ComboChartjsComponent', () => {
  let component: ComboChartjsComponent;
  let fixture: ComponentFixture<ComboChartjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboChartjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboChartjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
