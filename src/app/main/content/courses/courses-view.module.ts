import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';

const routes = [
  {
    path  : 'courses',
    component : CoursesComponent
  },
  {
    path  : 'course/create',
    component : CourseComponent
  },
  {
      path     : 'course/edit/:course_id',
      component: CourseComponent
  }
]


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FuseWidgetModule

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
