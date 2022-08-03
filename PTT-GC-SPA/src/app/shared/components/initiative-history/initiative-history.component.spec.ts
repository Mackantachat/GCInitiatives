import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeHistoryComponent } from './initiative-history.component';

describe('InitiativeHistoryComponent', () => {
  let component: InitiativeHistoryComponent;
  let fixture: ComponentFixture<InitiativeHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiativeHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
