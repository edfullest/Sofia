import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTopScoresComponent } from './course-top-scores.component';

describe('CourseTopScoresComponent', () => {
  let component: CourseTopScoresComponent;
  let fixture: ComponentFixture<CourseTopScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTopScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTopScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
