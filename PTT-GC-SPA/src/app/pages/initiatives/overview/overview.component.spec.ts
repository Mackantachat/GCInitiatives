import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewInitiativeComponent } from './overview.component';

describe('OverviewInitiativeComponent', () => {
  let component: OverviewInitiativeComponent;
  let fixture: ComponentFixture<OverviewInitiativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewInitiativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewInitiativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
