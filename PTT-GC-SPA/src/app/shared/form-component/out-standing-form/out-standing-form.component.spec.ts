import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutStandingFormComponent } from './out-standing-form.component';

describe('OutStandingFormComponent', () => {
  let component: OutStandingFormComponent;
  let fixture: ComponentFixture<OutStandingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutStandingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutStandingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
