import { Component } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';

import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { locale as english } from '../i18n/en';
import { locale as spanish } from '../i18n/es';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})

export class UserRegisterComponent {

  registerForm: FormGroup;

  constructor(private translationLoader: FuseTranslationLoaderService, public auth: AuthService) {
    this.translationLoader.loadTranslations(english, spanish);
   }




}
