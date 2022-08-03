import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeHeaderComponent } from './initiative-header.component';

describe('InitiativeHeaderComponent', () => {
  let component: InitiativeHeaderComponent;
  let fixture: ComponentFixture<InitiativeHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiativeHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
