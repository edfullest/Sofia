import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../core/services/config.service';
import { fuseAnimations } from '../../../core/animations';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  animations : fuseAnimations
})
export class UserLoginComponent implements OnInit{

  loginForm: FormGroup;
  loginFormErrors: any;

  constructor(public auth: AuthService,
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder) {

        this.fuseConfig.setSettings({
          layout: {
              navigation: 'none',
              toolbar   : 'none',
              footer    : 'none'
          }
      });

      this.loginFormErrors = {
          email   : {},
          password: {}
      };

    }

    ngOnInit()
    {
        this.loginForm = this.formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }

    onLoginFormValuesChanged()
    {
        for ( const field in this.loginFormErrors )
        {
            if ( !this.loginFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }



}
