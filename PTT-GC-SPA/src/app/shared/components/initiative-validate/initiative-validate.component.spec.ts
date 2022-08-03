import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeValidateComponent } from './initiative-validate.component';

describe('InitiativeValidateComponent', () => {
  let component: InitiativeValidateComponent;
  let fixture: ComponentFixture<InitiativeValidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiativeValidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
