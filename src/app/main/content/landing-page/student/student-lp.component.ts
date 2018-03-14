import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { fuseAnimations } from '../../../../core/animations';

import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

@Component({
  selector   : 'landing-page-view',
  templateUrl: './student-lp.component.html',
  styleUrls  : ['./student-lp.component.scss'],
  animations   : fuseAnimations,
  })

  export class StudentLPageComponent{

    constructor(public translationLoader: FuseTranslationLoaderService,
      public router: Router)
    {
      this.translationLoader.loadTranslations(english, spanish);
    }
 }
