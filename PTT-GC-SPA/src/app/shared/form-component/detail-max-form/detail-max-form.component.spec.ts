import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMaxFormComponent } from './detail-max-form.component';

describe('DetailMaxFormComponent', () => {
  let component: DetailMaxFormComponent;
  let fixture: ComponentFixture<DetailMaxFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMaxFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMaxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
