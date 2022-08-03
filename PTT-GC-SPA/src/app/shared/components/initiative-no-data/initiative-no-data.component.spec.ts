import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeNoDataComponent } from './initiative-no-data.component';

describe('InitiativeNoDataComponent', () => {
  let component: InitiativeNoDataComponent;
  let fixture: ComponentFixture<InitiativeNoDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiativeNoDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeNoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
