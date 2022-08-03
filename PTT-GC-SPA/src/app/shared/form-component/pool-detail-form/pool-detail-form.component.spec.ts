import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolDetailFormComponent } from './pool-detail-form.component';

describe('PoolDetailFormComponent', () => {
  let component: PoolDetailFormComponent;
  let fixture: ComponentFixture<PoolDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
