import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmoreCapexComponent } from './addmore-capex.component';

describe('AddmoreCapexComponent', () => {
  let component: AddmoreCapexComponent;
  let fixture: ComponentFixture<AddmoreCapexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmoreCapexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmoreCapexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
