import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeHistoryRedirectorComponent } from './initiative-history-redirector.component';

describe('InitiativeHistoryRedirectorComponent', () => {
  let component: InitiativeHistoryRedirectorComponent;
  let fixture: ComponentFixture<InitiativeHistoryRedirectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiativeHistoryRedirectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeHistoryRedirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
