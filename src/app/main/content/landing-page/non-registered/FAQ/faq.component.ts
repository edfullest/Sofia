import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ElementRef, Renderer, Input, Output, Optional, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { fuseAnimations } from '../../../../../core/animations';

import { FuseTranslationLoaderService } from '../../../../../core/services/translation-loader.service';
import { FuseUtils } from '../../../../../core/fuseUtils';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { FirebaseDatabase } from '@firebase/database-types';
import { FuseIfOnDomDirective } from '../../../../../core/directives/fuse-if-on-dom/fuse-if-on-dom.directive';
import { FirebaseApp, FirebaseAppProvider } from 'angularfire2';
import { FirebaseFirestore, DocumentReference } from '@firebase/firestore-types';
import { AngularFireDatabase } from 'angularfire2/database';




@Component({
  selector   : 'faq-page-view',
  templateUrl: './faq.component.html',
  styleUrls  : ['./faq.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class FAQComponent{

  faqCollection: AngularFirestoreCollection<any[]>;

  faqGeneralCollection: AngularFirestoreCollection<any[]>; // This is handled for the EN or ES Collection
    faqGeneral: Observable<any[]>;

  faqProfessorCollection: AngularFirestoreCollection<any[]>; // This is handled for the EN or ES Collection
    faqProfessor: Observable<any[]>;

  faqStudentCollection: AngularFirestoreCollection<any[]>; // This is handled for the EN or ES Collection
    faqStudent: Observable<any[]>;

  faqs: any;
  currentLang = 'ES';
  langChanged = false;
  step = 0;


  constructor(public translationLoader: FuseTranslationLoaderService,
              private translate: TranslateService,
              public router: Router,
              public db: AngularFirestore)
  {

    this.faqCollection = this.db.collection('FAQ');

    this.ChangeFAQContent();

    this.translationLoader.loadTranslations(english, spanish);

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.langChanged = !this.langChanged;
      if (this.translate.currentLang === 'es'){
        this.currentLang = 'ES';
      }
      else if (this.translate.currentLang === 'en')
      {
        this.currentLang = 'EN';
      }
      this.ChangeFAQContent();
  });




  }


  setStep(index: number)
    {
        this.step = index;
    }

    nextStep()
    {
        this.step++;
    }

    prevStep()
    {
        this.step--;
    }

    ChangeFAQContent()
    {

        this.faqGeneralCollection = this.faqCollection.doc('lMstBI9frneTqiarj1hX').collection(this.currentLang, ref => ref.orderBy('QuestionNum', 'asc'));
        this.faqProfessorCollection = this.faqCollection.doc('lCMZamzb03mQ3AGHK5i4').collection(this.currentLang, ref => ref.orderBy('QuestionNum', 'asc'));
        this.faqStudentCollection = this.faqCollection.doc('KesPex9MZ64nYTuO4f13').collection(this.currentLang, ref => ref.orderBy('QuestionNum', 'asc'));

        this.faqGeneral = this.faqGeneralCollection.snapshotChanges().map(document => {
          return document.map(documentData => {
            const data = documentData.payload.doc.data();
            const id = documentData.payload.doc.id;
            return { id, ...data };
          });
        });

        this.faqProfessor = this.faqProfessorCollection.snapshotChanges().map(document => {
          return document.map(documentData => {
            const data = documentData.payload.doc.data();
            const id = documentData.payload.doc.id;
            return { id, ...data };
          });
        });

        this.faqStudent = this.faqStudentCollection.snapshotChanges().map(document => {
          return document.map(documentData => {
            const data = documentData.payload.doc.data();
            const id = documentData.payload.doc.id;
            return { id, ...data };
          });
        });
    }

}
