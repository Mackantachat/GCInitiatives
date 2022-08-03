import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyownInitiativeComponent } from './myown.component';

describe('MyownInitiativeComponent', () => {
  let component: MyownInitiativeComponent;
  let fixture: ComponentFixture<MyownInitiativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyownInitiativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyownInitiativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
