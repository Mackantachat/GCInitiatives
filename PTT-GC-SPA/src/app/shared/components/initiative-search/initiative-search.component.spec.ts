import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeSearchComponent } from './initiative-search.component';

describe('InitiativeSearchComponent', () => {
  let component: InitiativeSearchComponent;
  let fixture: ComponentFixture<InitiativeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiativeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
