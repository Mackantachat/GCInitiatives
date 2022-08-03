import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeShowAttachmentComponent } from './initiative-show-attachment.component';

describe('InitiativeShowAttachmentComponent', () => {
  let component: InitiativeShowAttachmentComponent;
  let fixture: ComponentFixture<InitiativeShowAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiativeShowAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeShowAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
