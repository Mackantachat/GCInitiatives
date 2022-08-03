import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRevistionAddmoreComponent } from './view-revistion-addmore.component';

describe('ViewRevistionAddmoreComponent', () => {
  let component: ViewRevistionAddmoreComponent;
  let fixture: ComponentFixture<ViewRevistionAddmoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRevistionAddmoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRevistionAddmoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
