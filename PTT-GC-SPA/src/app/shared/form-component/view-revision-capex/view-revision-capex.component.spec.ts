import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRevisionCapexComponent } from './view-revision-capex.component';

describe('ViewRevisionCapexComponent', () => {
  let component: ViewRevisionCapexComponent;
  let fixture: ComponentFixture<ViewRevisionCapexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRevisionCapexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRevisionCapexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
