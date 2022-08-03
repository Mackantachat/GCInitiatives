import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactIoComponent } from './contact-io.component';

describe('ContactIoComponent', () => {
  let component: ContactIoComponent;
  let fixture: ComponentFixture<ContactIoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactIoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactIoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
