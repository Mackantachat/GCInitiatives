import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmoreDirectCapexComponent } from './addmore-direct-capex.component';

describe('AddmoreDirectCapexComponent', () => {
  let component: AddmoreDirectCapexComponent;
  let fixture: ComponentFixture<AddmoreDirectCapexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmoreDirectCapexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmoreDirectCapexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
