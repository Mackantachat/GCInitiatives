import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInitiativeComponent } from './main.component';

describe('MainInitiativeComponent', () => {
  let component: MainInitiativeComponent;
  let fixture: ComponentFixture<MainInitiativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainInitiativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainInitiativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
