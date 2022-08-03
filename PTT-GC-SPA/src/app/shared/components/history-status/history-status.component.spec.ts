import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryStatusComponent } from './history-status.component';

describe('HistoryStatusComponent', () => {
  let component: HistoryStatusComponent;
  let fixture: ComponentFixture<HistoryStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
