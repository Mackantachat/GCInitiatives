import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookbackEnvironmentComponent } from './lookback-environment.component';

describe('LookbackEnvironmentComponent', () => {
  let component: LookbackEnvironmentComponent;
  let fixture: ComponentFixture<LookbackEnvironmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookbackEnvironmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookbackEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
