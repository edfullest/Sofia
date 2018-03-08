import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerCoursesComponent } from './viewer-courses.component';

describe('ViewerCoursesComponent', () => {
  let component: ViewerCoursesComponent;
  let fixture: ComponentFixture<ViewerCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewerCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
