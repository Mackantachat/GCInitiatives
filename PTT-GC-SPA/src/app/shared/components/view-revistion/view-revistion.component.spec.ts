import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRevistionComponent } from './view-revistion.component';

describe('ViewRevistionComponent', () => {
  let component: ViewRevistionComponent;
  let fixture: ComponentFixture<ViewRevistionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRevistionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRevistionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
