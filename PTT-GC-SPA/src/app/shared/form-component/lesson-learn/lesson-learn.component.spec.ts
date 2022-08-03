import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonLearnComponent } from './lesson-learn.component';

describe('LessonLearnComponent', () => {
  let component: LessonLearnComponent;
  let fixture: ComponentFixture<LessonLearnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonLearnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
