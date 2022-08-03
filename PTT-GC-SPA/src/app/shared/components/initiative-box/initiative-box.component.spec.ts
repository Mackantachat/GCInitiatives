import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeBoxComponent } from './initiative-box.component';

describe('InitiativeBoxComponent', () => {
  let component: InitiativeBoxComponent;
  let fixture: ComponentFixture<InitiativeBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiativeBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
