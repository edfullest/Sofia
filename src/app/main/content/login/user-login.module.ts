import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';

import { UserLoginComponent } from './user-login.component';
import { UserRegisterComponent } from './register/user-register.component';

const routes = [
    {
      path     : 'login',
      component: UserLoginComponent,
    },
    {
      path     : 'register',
      component: UserRegisterComponent,
    }
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),

  ],
  declarations: [
    UserLoginComponent,
    UserRegisterComponent
  ],
  exports     : [
    UserLoginComponent,
    UserRegisterComponent
  ]
})
export class UserLoginModule { }
