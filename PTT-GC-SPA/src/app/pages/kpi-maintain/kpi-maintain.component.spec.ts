import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiMaintainComponent } from './kpi-maintain.component';

describe('KpiMaintainComponent', () => {
  let component: KpiMaintainComponent;
  let fixture: ComponentFixture<KpiMaintainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiMaintainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
