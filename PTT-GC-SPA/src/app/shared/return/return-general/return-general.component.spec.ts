import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnGeneralComponent } from './return-general.component';

describe('ReturnGeneralComponent', () => {
  let component: ReturnGeneralComponent;
  let fixture: ComponentFixture<ReturnGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
