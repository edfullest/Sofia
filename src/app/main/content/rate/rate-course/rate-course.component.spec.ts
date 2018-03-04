import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateCourseComponent } from './rate-course.component';

describe('RateCourseComponent', () => {
  let component: RateCourseComponent;
  let fixture: ComponentFixture<RateCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
