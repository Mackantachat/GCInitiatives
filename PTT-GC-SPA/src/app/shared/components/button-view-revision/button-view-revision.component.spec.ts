import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonViewRevisionComponent } from './button-view-revision.component';

describe('ButtonViewRevisionComponent', () => {
  let component: ButtonViewRevisionComponent;
  let fixture: ComponentFixture<ButtonViewRevisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonViewRevisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonViewRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
