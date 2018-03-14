import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';

import { NRLandingPageComponent } from './non-registered/non-registered.component';
import { StudentLPageComponent } from './student/student-lp.component';

const routes = [
  {
    path     : 'home',
    component: NRLandingPageComponent,
  },
  {
    path     : 'student/home',
    component: StudentLPageComponent,
  }

];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [NRLandingPageComponent, StudentLPageComponent],
  exports : [NRLandingPageComponent, StudentLPageComponent]
})
export class LandingPageModule { }
