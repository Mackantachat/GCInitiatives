import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BscInformationComponent } from './bsc-information.component';

describe('BscInformationComponent', () => {
  let component: BscInformationComponent;
  let fixture: ComponentFixture<BscInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BscInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BscInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
