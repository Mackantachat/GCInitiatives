import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeGenerateAppWbsComponent } from './initiative-generate-app-wbs.component';

describe('InitiativeGenerateAppWbsComponent', () => {
  let component: InitiativeGenerateAppWbsComponent;
  let fixture: ComponentFixture<InitiativeGenerateAppWbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiativeGenerateAppWbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeGenerateAppWbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
