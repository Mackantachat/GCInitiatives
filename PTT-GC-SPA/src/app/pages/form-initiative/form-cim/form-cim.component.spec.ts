import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCimComponent } from './form-cim.component';

describe('FormCimComponent', () => {
  let component: FormCimComponent;
  let fixture: ComponentFixture<FormCimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
