import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmoreComponent } from './addmore.component';

describe('AddmoreComponent', () => {
  let component: AddmoreComponent;
  let fixture: ComponentFixture<AddmoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
