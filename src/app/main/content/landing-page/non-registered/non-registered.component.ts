import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { fuseAnimations } from '../../../../core/animations';

import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { FirebaseDatabase } from '@firebase/database-types';
import { FuseIfOnDomDirective } from '../../../../core/directives/fuse-if-on-dom/fuse-if-on-dom.directive';
import { FirebaseApp, FirebaseAppProvider } from 'angularfire2';
import { FirebaseFirestore, DocumentReference } from '@firebase/firestore-types';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector   : 'landing-page-view',
  templateUrl: './non-registered.component.html',
  styleUrls  : ['./non-registered.component.scss'],
  animations   : fuseAnimations,
  })

  export class NRLandingPageComponent{

    coursesCollection: AngularFirestoreCollection<any[]>;
    courses: Observable<any[]>;
    categoriesCollection: AngularFirestoreCollection<any[]>;
    categories: Observable<any[]>;
    categorySelected = 'All';

    searchBarInput = '';


    constructor(public translationLoader: FuseTranslationLoaderService,
                public router: Router,
                public db: AngularFirestore)
    {

      this.translationLoader.loadTranslations(english, spanish);

      this.coursesCollection = this.db.collection('courses');

      this.courses = this.coursesCollection.snapshotChanges().map(document => {
            return document.map(documentData => {
              const data = documentData.payload.doc.data();
              const id = documentData.payload.doc.id;
              return { id, ...data };
            });
         });

      this.categoriesCollection = this.db.collection('categories');
      this.categories = this.categoriesCollection.valueChanges();

    }


    testInput(courseName: String){

      const courseNameComparison = courseName.toLowerCase();
      const searchBarInputComparison = this.searchBarInput.toLowerCase();

      return courseNameComparison.indexOf(searchBarInputComparison) !== -1;
    }

    getMostPopular()
    {

    }

    getBestRated()
    {
      // Get the 5 most rated courses

    }


 }
