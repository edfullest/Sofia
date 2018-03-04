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

const routes = [
  {
    path  : 'courses', pathMatch: 'prefix',
    component : CoursesComponent

  },
  {
    path  : 'course/create',
    component : CourseComponent
  },
  {
      path     : 'course/edit/:course_id',
      component: CourseComponent
  },
  {
      path     : 'course/rate/:course_id',
      component: RateCourseComponent
  },

]


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FuseWidgetModule,
    RateModule

  ],
  declarations: [
    CoursesComponent,
    CourseComponent
  ],
  exports     :[
    CoursesComponent
  ]
})
export class CoursesViewModule { }
