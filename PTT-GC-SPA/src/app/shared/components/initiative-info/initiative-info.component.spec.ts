import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeInfoComponent } from './initiative-info.component';

describe('InitiativeInfoComponent', () => {
  let component: InitiativeInfoComponent;
  let fixture: ComponentFixture<InitiativeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiativeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
