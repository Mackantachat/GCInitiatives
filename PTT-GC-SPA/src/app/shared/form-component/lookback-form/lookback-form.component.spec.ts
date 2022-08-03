import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookbackFormComponent } from './lookback-form.component';

describe('LookbackFormComponent', () => {
  let component: LookbackFormComponent;
  let fixture: ComponentFixture<LookbackFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookbackFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookbackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
