import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeFileComponent } from './initiative-file.component';

describe('InitiativeFileComponent', () => {
  let component: InitiativeFileComponent;
  let fixture: ComponentFixture<InitiativeFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiativeFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
