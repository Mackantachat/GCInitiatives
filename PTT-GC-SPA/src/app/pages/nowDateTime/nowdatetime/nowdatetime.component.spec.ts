import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NowdatetimeComponent } from './nowdatetime.component';

describe('NowdatetimeComponent', () => {
  let component: NowdatetimeComponent;
  let fixture: ComponentFixture<NowdatetimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NowdatetimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NowdatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
