import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeLoadComponent } from './initiative-load.component';

describe('InitiativeLoadComponent', () => {
  let component: InitiativeLoadComponent;
  let fixture: ComponentFixture<InitiativeLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiativeLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
