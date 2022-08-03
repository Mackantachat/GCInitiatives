import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiKriMaintainComponent } from './kpi-kri-maintain.component';

describe('KpiKriMaintainComponent', () => {
  let component: KpiKriMaintainComponent;
  let fixture: ComponentFixture<KpiKriMaintainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiKriMaintainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiKriMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
