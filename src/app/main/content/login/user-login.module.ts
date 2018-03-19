import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';

import { UserLoginComponent } from './user-login.component';
import { UserRegisterComponent } from './register/user-register.component';
import { ChooseCategoriesComponent } from './choose-categories/choose-categories.component';

const routes = [
    {
      path     : 'login',
      component: UserLoginComponent,
    },
    {
      path     : 'register',
      component: UserRegisterComponent,
    },
    {
      path     : 'choose_categories',
      component: ChooseCategoriesComponent,
    }
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FuseWidgetModule,
    RouterModule.forChild(routes),

  ],
  declarations: [
    UserLoginComponent,
    UserRegisterComponent,
    ChooseCategoriesComponent
  ],
  exports     : [
    UserLoginComponent,
    UserRegisterComponent
  ]
})
export class UserLoginModule { }
