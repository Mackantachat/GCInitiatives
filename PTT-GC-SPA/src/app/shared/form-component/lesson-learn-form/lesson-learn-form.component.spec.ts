import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonLearnFormComponent } from './lesson-learn-form.component';

describe('LessonLearnFormComponent', () => {
  let component: LessonLearnFormComponent;
  let fixture: ComponentFixture<LessonLearnFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonLearnFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonLearnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
