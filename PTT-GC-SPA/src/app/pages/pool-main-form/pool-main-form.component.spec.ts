import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolMainFormComponent } from './pool-main-form.component';

describe('PoolMainFormComponent', () => {
  let component: PoolMainFormComponent;
  let fixture: ComponentFixture<PoolMainFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolMainFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolMainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
