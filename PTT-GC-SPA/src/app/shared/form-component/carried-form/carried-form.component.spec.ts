import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriedFormComponent } from './carried-form.component';

describe('CarriedFormComponent', () => {
  let component: CarriedFormComponent;
  let fixture: ComponentFixture<CarriedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarriedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarriedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
