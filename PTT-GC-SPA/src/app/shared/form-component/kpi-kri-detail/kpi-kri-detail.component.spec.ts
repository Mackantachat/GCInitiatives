import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiKriDetailComponent } from './kpi-kri-detail.component';

describe('KpiKriDetailComponent', () => {
  let component: KpiKriDetailComponent;
  let fixture: ComponentFixture<KpiKriDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiKriDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiKriDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
