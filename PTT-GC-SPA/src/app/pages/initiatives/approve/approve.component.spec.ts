import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveInitiativeComponent } from './approve.component';

describe('ApproveInitiativeComponent', () => {
  let component: ApproveInitiativeComponent;
  let fixture: ComponentFixture<ApproveInitiativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveInitiativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveInitiativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
