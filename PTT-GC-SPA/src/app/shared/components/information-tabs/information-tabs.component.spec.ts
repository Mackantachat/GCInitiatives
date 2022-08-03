import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationTabsComponent } from './information-tabs.component';

describe('InformationTabsComponent', () => {
  let component: InformationTabsComponent;
  let fixture: ComponentFixture<InformationTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
