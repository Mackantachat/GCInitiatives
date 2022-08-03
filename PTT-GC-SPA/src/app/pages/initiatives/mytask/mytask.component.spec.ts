import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MytaskInitiativeComponent } from './mytask.component';

describe('MytaskInitiativeComponent', () => {
  let component: MytaskInitiativeComponent;
  let fixture: ComponentFixture<MytaskInitiativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MytaskInitiativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MytaskInitiativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
