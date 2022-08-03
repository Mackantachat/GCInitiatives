import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSystemComponent } from './dashboard-system.component';

describe('DashboardSystemComponent', () => {
  let component: DashboardSystemComponent;
  let fixture: ComponentFixture<DashboardSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
