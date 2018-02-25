import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';


import {UserProfileComponent} from './user-profile.component';

const routes = [
    {
        path     : '**',
        component: UserProfileComponent,
    }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),

  ],
  declarations: [
    UserProfileComponent
  ],
  exports     : [
    UserProfileComponent
  ]
})
export class UserProfileModule { }
