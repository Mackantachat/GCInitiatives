import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPimFormComponent } from './detail-pim-form.component';

describe('DetailPimFormComponent', () => {
  let component: DetailPimFormComponent;
  let fixture: ComponentFixture<DetailPimFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPimFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPimFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
