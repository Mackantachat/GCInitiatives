import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRevistionPoolComponent } from './view-revistion-pool.component';

describe('ViewRevistionPoolComponent', () => {
  let component: ViewRevistionPoolComponent;
  let fixture: ComponentFixture<ViewRevistionPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRevistionPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRevistionPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
