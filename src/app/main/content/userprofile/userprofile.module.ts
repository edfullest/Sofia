import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';

import { UserprofileComponent } from './userprofile.component';

const routes = [
  {
    path  : 'user', //pathMatch: 'prefix',
    component : UserprofileComponent

  },
  
  {
        path     : 'user/:user_id',
        component: UserprofileComponent
  }
  
  
]

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserprofileComponent],
  exports:[UserprofileComponent]
})
export class UserprofileModule { }
