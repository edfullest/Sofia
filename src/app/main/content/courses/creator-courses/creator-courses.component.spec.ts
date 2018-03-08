import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorCoursesComponent } from './creator-courses.component';

describe('CreatorCoursesComponent', () => {
  let component: CreatorCoursesComponent;
  let fixture: ComponentFixture<CreatorCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatorCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
