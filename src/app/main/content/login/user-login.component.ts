import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {

  constructor(public auth: AuthService) { }




}
