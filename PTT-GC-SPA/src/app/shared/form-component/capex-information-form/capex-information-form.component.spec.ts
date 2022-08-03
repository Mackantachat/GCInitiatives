import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapexInformationFormComponent } from './capex-information-form.component';

describe('CapexInformationFormComponent', () => {
  let component: CapexInformationFormComponent;
  let fixture: ComponentFixture<CapexInformationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapexInformationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapexInformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
