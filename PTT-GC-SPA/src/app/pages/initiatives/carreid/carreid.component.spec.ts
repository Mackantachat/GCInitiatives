import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreidComponent } from './carreid.component';

describe('CarreidComponent', () => {
  let component: CarreidComponent;
  let fixture: ComponentFixture<CarreidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarreidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarreidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
