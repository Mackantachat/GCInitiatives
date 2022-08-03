import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriedGeneralComponent } from './carried-general.component';

describe('CarriedGeneralComponent', () => {
  let component: CarriedGeneralComponent;
  let fixture: ComponentFixture<CarriedGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarriedGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarriedGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
