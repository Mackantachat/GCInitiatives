import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRevitionAddmorePoolComponent } from './view-revition-addmore-pool.component';

describe('ViewRevitionAddmorePoolComponent', () => {
  let component: ViewRevitionAddmorePoolComponent;
  let fixture: ComponentFixture<ViewRevitionAddmorePoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRevitionAddmorePoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRevitionAddmorePoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
