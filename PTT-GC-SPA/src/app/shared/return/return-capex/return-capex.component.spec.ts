import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnCapexComponent } from './return-capex.component';

describe('ReturnCapexComponent', () => {
  let component: ReturnCapexComponent;
  let fixture: ComponentFixture<ReturnCapexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnCapexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnCapexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
