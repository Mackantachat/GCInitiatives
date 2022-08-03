import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeAttachmentComponent } from './initiative-attachment.component';

describe('InitiativeAttachmentComponent', () => {
  let component: InitiativeAttachmentComponent;
  let fixture: ComponentFixture<InitiativeAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiativeAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
