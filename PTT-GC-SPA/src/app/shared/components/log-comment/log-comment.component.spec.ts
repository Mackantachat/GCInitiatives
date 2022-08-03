import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogCommentComponent } from './log-comment.component';

describe('LogCommentComponent', () => {
  let component: LogCommentComponent;
  let fixture: ComponentFixture<LogCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
