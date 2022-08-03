import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRevistionReturnComponent } from './view-revistion-return.component';

describe('ViewRevistionReturnComponent', () => {
  let component: ViewRevistionReturnComponent;
  let fixture: ComponentFixture<ViewRevistionReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRevistionReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRevistionReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
