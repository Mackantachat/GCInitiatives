import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCpiFormComponent } from './detail-cpi-form.component';

describe('DetailCpiFormComponent', () => {
  let component: DetailCpiFormComponent;
  let fixture: ComponentFixture<DetailCpiFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCpiFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCpiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
