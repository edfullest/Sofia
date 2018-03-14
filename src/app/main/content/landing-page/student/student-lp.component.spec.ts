import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLPageComponent } from './student-lp.component';

describe('StudentLPageComponent', () => {
  let component: StudentLPageComponent;
  let fixture: ComponentFixture<StudentLPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentLPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
