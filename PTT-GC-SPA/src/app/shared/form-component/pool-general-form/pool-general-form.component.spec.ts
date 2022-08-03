import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolGeneralFormComponent } from './pool-general-form.component';

describe('PoolGeneralFormComponent', () => {
  let component: PoolGeneralFormComponent;
  let fixture: ComponentFixture<PoolGeneralFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolGeneralFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolGeneralFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
