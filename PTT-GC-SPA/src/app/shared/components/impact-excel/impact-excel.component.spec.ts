import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactExcelComponent } from './impact-excel.component';

describe('ImpactExcelComponent', () => {
  let component: ImpactExcelComponent;
  let fixture: ComponentFixture<ImpactExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpactExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
