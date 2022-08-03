import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmoreButtonComponent } from './addmore-button.component';

describe('AddmoreButtonComponent', () => {
  let component: AddmoreButtonComponent;
  let fixture: ComponentFixture<AddmoreButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmoreButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmoreButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
