import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ElementRef, Renderer, Input, Output, Optional, EventEmitter, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';
import { fuseAnimations } from '../../../../../core/animations';

import { FuseTranslationLoaderService } from '../../../../../core/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';


@Component({
  selector   : 'faq-page-view',
  templateUrl: './faq.component.html',
  styleUrls  : ['./faq.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class FAQComponent{

  constructor(public translationLoader: FuseTranslationLoaderService)
  {
    this.translationLoader.loadTranslations(english, spanish);
  }

}
