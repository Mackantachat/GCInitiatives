import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmorePoolComponent } from './addmore-pool.component';

describe('AddmorePoolComponent', () => {
  let component: AddmorePoolComponent;
  let fixture: ComponentFixture<AddmorePoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmorePoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmorePoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
