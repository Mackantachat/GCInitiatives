import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriedCapexComponent } from './carried-capex.component';

describe('CarriedCapexComponent', () => {
  let component: CarriedCapexComponent;
  let fixture: ComponentFixture<CarriedCapexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarriedCapexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarriedCapexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
