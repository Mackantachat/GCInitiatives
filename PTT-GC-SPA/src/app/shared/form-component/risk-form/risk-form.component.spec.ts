import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskFormComponent } from './risk-form.component';

describe('RiskFormComponent', () => {
  let component: RiskFormComponent;
  let fixture: ComponentFixture<RiskFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
