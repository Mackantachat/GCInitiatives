import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiKriFormComponent } from './kpi-kri-form.component';

describe('KpiKriFormComponent', () => {
  let component: KpiKriFormComponent;
  let fixture: ComponentFixture<KpiKriFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiKriFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiKriFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
