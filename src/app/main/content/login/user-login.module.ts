import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';

import { UserLoginComponent } from './user-login.component';

const routes = [
    {
        path     : 'login',
        component: UserLoginComponent,
    }
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),

  ],
  declarations: [
    UserLoginComponent
  ],
  exports     : [
    UserLoginComponent
  ]
})
export class UserLoginModule { }
