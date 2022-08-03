import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacPicComponent } from './vac-pic.component';

describe('VacPicComponent', () => {
  let component: VacPicComponent;
  let fixture: ComponentFixture<VacPicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacPicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
