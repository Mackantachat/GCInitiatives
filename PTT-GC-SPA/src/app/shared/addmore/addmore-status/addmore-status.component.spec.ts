import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmoreStatusComponent } from './addmore-status.component';

describe('AddmoreStatusComponent', () => {
  let component: AddmoreStatusComponent;
  let fixture: ComponentFixture<AddmoreStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmoreStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmoreStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
