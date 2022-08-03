import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolCapexInfoFormComponent } from './pool-capex-info-form.component';

describe('PoolCapexInfoFormComponent', () => {
  let component: PoolCapexInfoFormComponent;
  let fixture: ComponentFixture<PoolCapexInfoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolCapexInfoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolCapexInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
