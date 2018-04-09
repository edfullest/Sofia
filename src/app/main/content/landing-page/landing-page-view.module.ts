import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';

import { FuseWidgetModule } from '../../../core/components/widget/widget.module';
import { NRLandingPageComponent, SortCoursesPipe } from './non-registered/non-registered.component';
import { StudentLPageComponent } from './student/student-lp.component';
import { CarouselComponent, PrintSlideComponent, SafeHtmlPipe } from './non-registered/carousel/carousel.component';
import { FAQComponent } from './non-registered/FAQ/faq.component';

const routes = [
  {
    path     : 'home',
    component: NRLandingPageComponent,
  },
  {
    path     : 'student/home',
    component: StudentLPageComponent,
  },
  {
    path     : 'faq',
    component: FAQComponent,
  }
];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FuseWidgetModule,
  ],
  declarations: [NRLandingPageComponent,
                  StudentLPageComponent,
                  CarouselComponent,
                  PrintSlideComponent,
                  SafeHtmlPipe,
                  SortCoursesPipe,
                  FAQComponent],

  exports : [NRLandingPageComponent,
              StudentLPageComponent,
              CarouselComponent,
              PrintSlideComponent,
              SafeHtmlPipe,
              SortCoursesPipe,
              FAQComponent]
})
export class LandingPageModule { }
