import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Reporttest01Component } from './reporttest01.component';

describe('Reporttest01Component', () => {
  let component: Reporttest01Component;
  let fixture: ComponentFixture<Reporttest01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Reporttest01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Reporttest01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
