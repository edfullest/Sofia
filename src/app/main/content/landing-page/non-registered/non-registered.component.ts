import { Component, OnInit, AfterViewInit, PipeTransform, Pipe } from '@angular/core';
import { ElementRef, Renderer, Input, Output, Optional, EventEmitter, ViewEncapsulation } from '@angular/core';

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

export interface CoursesData{
  author: string;
  category: string;
  categoryId: string;
  createdBy: string;
  description?: string;
  difficulty: number;
  imageData: [{ name: string; url: string; }];
  name: string;
  price: number;
  rating: [ { negative: number; positive: number } ];
}


@Component({
  selector   : 'landing-page-view',
  templateUrl: './non-registered.component.html',
  styleUrls  : ['./non-registered.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

  export class NRLandingPageComponent{

    coursesCollection: AngularFirestoreCollection<any[]>;
    courses: Observable<any[]>;
    coursesData: CoursesData[];
    categoriesCollection: AngularFirestoreCollection<any[]>;
    categories: Observable<any[]>;
    categorySelected = 'All';

    courseImages: Array<any> = [
      {
        'sType' : 'img',
        'imgSrc': 'https://goo.gl/ysWes8'
      },
      {
        'sType' : 'img',
        'imgSrc': 'https://goo.gl/ahpxwb'
      },
      {
        'sType' : 'img',
        'imgSrc': 'https://goo.gl/6WHHCz'
      }
    ];

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


    sortByPopularity()
    {
      // Get the most popular courses
    }

    sortByRating()
    {
      // Get the most rated courses
      console.log('sort by rating');
    }


 }

@Pipe({
  name: 'sortCourses'
})
export class SortCoursesPipe  implements PipeTransform {
  transform(array: Array<string>, args: string): Array<string> {
    array.sort((a: any, b: any) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
