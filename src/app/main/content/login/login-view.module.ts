import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../core/modules/shared.module';

import { FuseWidgetModule } from '../../../core/components/widget/widget.module';

import { LoginComponent } from './login.component';

const routes = [
  {
      path     : 'login',
      component: LoginComponent
  }
];

@NgModule({
  declarations: [
      LoginComponent
  ],
  imports     : [
      SharedModule,
      CommonModule,
      RouterModule.forChild(routes),
      FuseWidgetModule
  ],
  exports     : [
    LoginComponent
  ]
})

export class LoginViewModule{ }
