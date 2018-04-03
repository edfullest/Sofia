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
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector   : 'landing-page-view',
  templateUrl: './student-lp.component.html',
  styleUrls  : ['./student-lp.component.scss'],
  animations   : fuseAnimations,
  })

  export class StudentLPageComponent{
    coursesCollection: AngularFirestoreCollection<any[]>;
    otherCourses : Observable<any[]>;
    coursesForYou$ : Observable<any[]>;
    courses : Observable<any[]>;


    constructor(public translationLoader: FuseTranslationLoaderService,
                public router: Router,
                public db: AngularFirestore,
                public auth : AuthService)
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

      
      
      this.auth.user.subscribe( userData => {
          this.coursesForYou$ = this.courses.map(courses => courses.filter(course => {
            return userData.myCategories.includes(course.categoryID) && !course.students[userData.uid]
          }));
          this.otherCourses = this.courses.map(courses => courses.filter(course => {
            return !userData.myCategories.includes(course.categoryID) && !course.students[userData.uid]
          }));

      })
    }

    subscribeToCourse(course){
      this.auth.user.subscribe(userData => {
            course.students[userData.uid] = true;
            this.coursesCollection.doc(course.id).update(course)
        })
      this.router.navigate(['/student/courses']);
    }

 }
