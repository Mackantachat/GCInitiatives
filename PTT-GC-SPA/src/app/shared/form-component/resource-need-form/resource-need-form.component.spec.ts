import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceNeedFormComponent } from './resource-need-form.component';

describe('ResourceNeedFormComponent', () => {
  let component: ResourceNeedFormComponent;
  let fixture: ComponentFixture<ResourceNeedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceNeedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceNeedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
