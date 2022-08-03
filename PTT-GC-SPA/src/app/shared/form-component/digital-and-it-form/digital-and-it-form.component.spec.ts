import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalAndItFormComponent } from './digital-and-it-form.component';

describe('DigitalAndItFormComponent', () => {
  let component: DigitalAndItFormComponent;
  let fixture: ComponentFixture<DigitalAndItFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalAndItFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalAndItFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
