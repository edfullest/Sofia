import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';

import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { locale as english } from '../i18n/en';
import { locale as spanish } from '../i18n/es';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '../../../../core/animations';
import { FuseConfigService } from '../../../../core/services/config.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
  animations: fuseAnimations
})

export class UserRegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerFormErrors: any;

  constructor(
    private translationLoader: FuseTranslationLoaderService,
    public auth: AuthService,
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder) {

    this.translationLoader.loadTranslations(english, spanish);

    this.fuseConfig.setSettings({
      layout: {
          navigation: 'none',
          toolbar   : 'above',
          footer    : 'none'
      }
    });

    this.registerFormErrors = {
      name    : {},
      email   : {},
      password: {},
      passwordConfirmation: {}
    };
  }

  ngOnInit()
    {
        this.registerForm = this.formBuilder.group({
            name : ['', Validators.required],
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            passwordConfirmation: ['', Validators.required]
        });

        this.registerForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });
    }

    onRegisterFormValuesChanged()
    {
        for ( const field in this.registerFormErrors )
        {
            if ( !this.registerFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.registerFormErrors[field] = {};

            // Get the control
            const control = this.registerForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.registerFormErrors[field] = control.errors;
            }
        }
    }




}
