import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLogHistoryComponent } from './view-log-history.component';

describe('ViewLogHistoryComponent', () => {
  let component: ViewLogHistoryComponent;
  let fixture: ComponentFixture<ViewLogHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLogHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLogHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
