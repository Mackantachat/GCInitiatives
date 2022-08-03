import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeredirectorComponent } from './initiativeredirector.component';

describe('InitiativeredirectorComponent', () => {
  let component: InitiativeredirectorComponent;
  let fixture: ComponentFixture<InitiativeredirectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiativeredirectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeredirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
