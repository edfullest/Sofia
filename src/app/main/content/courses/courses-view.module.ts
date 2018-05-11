import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';
import { GamesViewComponent } from '../games/games-view.component';
import { RateModule } from '../rate/rate.module';
import { RateCourseComponent } from '../rate/rate-course/rate-course.component';
import { AuthGuard, StudentGuard, ProfessorGuard, CanUpdateCourseGuard } from '../../../../app/auth/auth_guard/auth.guard';
import { ViewerCoursesComponent } from './viewer-courses/viewer-courses.component';
import { CreatorCoursesComponent } from './creator-courses/creator-courses.component';
import { CourseTopScoresComponent } from './course-top-scores/course-top-scores.component';
import { DropZoneDirective } from './course/drop-zone.directive';

const routes = [
  {
    path  : 'teacher/courses', pathMatch: 'prefix',
    component : CreatorCoursesComponent,
    canActivate: [AuthGuard, ProfessorGuard]

  },
  {
    path  : 'teacher/course/create',
    component : CourseComponent,
    canActivate: [AuthGuard,
                  ProfessorGuard]
  },
  {
      path     : 'teacher/course/edit/:course_id',
      component: CourseComponent,
      canActivate: [AuthGuard,
                    CanUpdateCourseGuard,
                  ]
  },
  {
      path     : 'student/course/rate/:course_id',
      component: RateCourseComponent,
      canActivate: [AuthGuard,
                    StudentGuard,
                  ]
  },
  { 
     path     : 'teacher/courses/reload', 
     redirectTo: 'courses'
  },
   {
    path  : 'student/courses', pathMatch: 'prefix',
    component : ViewerCoursesComponent,
    canActivate: [AuthGuard,
                  StudentGuard]

  },
    {
        path     : 'student/courses/:course_id/topscores',
        component: CourseTopScoresComponent
    },

];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FuseWidgetModule,
    RateModule,

  ],
  declarations: [
    CoursesComponent,
    CourseComponent,
    ViewerCoursesComponent,
    CreatorCoursesComponent,
    CourseTopScoresComponent,
    DropZoneDirective
  ],
  providers : [AuthGuard, StudentGuard, ProfessorGuard, CanUpdateCourseGuard],
  exports     :[
    CoursesComponent
  ]
})
export class CoursesViewModule { }
