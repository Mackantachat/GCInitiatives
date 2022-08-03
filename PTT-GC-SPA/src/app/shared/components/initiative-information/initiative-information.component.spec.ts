import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeInformationComponent } from './initiative-information.component';

describe('InitiativeInformationComponent', () => {
  let component: InitiativeInformationComponent;
  let fixture: ComponentFixture<InitiativeInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiativeInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
