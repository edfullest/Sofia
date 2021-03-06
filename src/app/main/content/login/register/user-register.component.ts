import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';

import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { locale as english } from '../i18n/en';
import { locale as spanish } from '../i18n/es';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '../../../../core/animations';
import { FuseConfigService } from '../../../../core/services/config.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

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
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private router : Router) {

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
            password: ['', [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(20),
              Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
            ]],
            passwordConfirmation: ['', [Validators.required]]
        }, {validator: this.checkIfMatchingPasswords('password', 'passwordConfirmation')});

        this.registerForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });
    }

    signup(): void {
      this.auth.emailSignUp(this.registerForm).then(response=>{
          console.log(response)
          if (response === undefined){
            this.snackBar.open('Ese correo ya está registrado', '', {
              duration: 4000,
              verticalPosition: 'bottom'
            });
          }
          else{
            this.snackBar.open('¡Ve a tu correo y confirma tu registro!', '', {
              duration: 2000,
              verticalPosition: 'top'
            });
            this.router.navigate(['/choose_categories']);
          }
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

    checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
          return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
              return passwordConfirmationInput.setErrors({notEquivalent: true})
            }
            else {
                return passwordConfirmationInput.setErrors(null);
            }
          }
        }


}
