import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonLearnAttachmentComponent } from './lesson-learn-attachment.component';

describe('LessonLearnAttachmentComponent', () => {
  let component: LessonLearnAttachmentComponent;
  let fixture: ComponentFixture<LessonLearnAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonLearnAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonLearnAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
