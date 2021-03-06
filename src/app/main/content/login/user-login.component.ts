import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../core/services/config.service';
import { fuseAnimations } from '../../../core/animations';

import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';
import { Router } from "@angular/router";


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  animations : fuseAnimations
})
export class UserLoginComponent implements OnInit{

  loginForm: FormGroup;
  loginFormErrors: any;

  constructor(
    private translationLoader: FuseTranslationLoaderService,
    public auth: AuthService,
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder,
    private router: Router) {

      this.translationLoader.loadTranslations(english, spanish);

        this.fuseConfig.setSettings({
          layout: {
              navigation: 'none',
              toolbar   : 'above',
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

    signin(): void
    {
      let res = this.auth.emailLogin(this.loginForm.value['email'], this.loginForm.value['password']).then(data => {
        console.log(data)
        if (data.uid !== ''){
            this.router.navigate(["/student/home"])
        }
      })
    }
    googleLogin(){
      console.log(this.auth.googleLogin())

    }

    facebookLogin(){
      this.auth.facebookLogin().then(data =>{
        console.log(data)
      })
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
