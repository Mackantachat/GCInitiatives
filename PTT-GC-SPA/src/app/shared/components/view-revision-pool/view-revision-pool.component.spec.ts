import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRevisionPoolComponent } from './view-revision-pool.component';

describe('ViewRevisionPoolComponent', () => {
  let component: ViewRevisionPoolComponent;
  let fixture: ComponentFixture<ViewRevisionPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRevisionPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRevisionPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
