import { Component } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '../../../core/animations';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';
import { FirebaseDatabase } from '@firebase/database-types';
import { FuseIfOnDomDirective } from '../../../core/directives/fuse-if-on-dom/fuse-if-on-dom.directive';
import { FirebaseApp, FirebaseAppProvider } from 'angularfire2';
import { FirebaseFirestore, DocumentReference } from '@firebase/firestore-types';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../../auth/auth.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector   : 'courses-view',
  templateUrl: './courses.component.html',
  styleUrls  : ['./courses.component.scss'],
  animations   : fuseAnimations,
  providers : [],
  })

  export class CoursesComponent{


    isCreator = false ;
    coursesCollection: AngularFirestoreCollection<any[]>;
    courses: Observable<any[]>;
    categoriesCollection: AngularFirestoreCollection<any[]>;
    categories: Observable<any[]>;
    categorySelected = 'All';

    searchBarInput = '';


    
    constructor(public translationLoader: FuseTranslationLoaderService, 
                public db: AngularFirestore, 
                public router: Router,
                public auth: AuthService)
    {
      this.auth.user.subscribe( userData => {
        this.coursesCollection = this.db.collection('courses', ref => 
                               ref.where('createdBy', '==', userData.uid));
        this.courses = this.coursesCollection.snapshotChanges().map(document => {
            return document.map(documentData => {
              const data = documentData.payload.doc.data();
              const id = documentData.payload.doc.id;
              // We check if the user already rated that course
              let isRatedByUser = false;
              for (const uid in data.usersThatRated) {
                if (uid === userData.uid){
                  isRatedByUser = true;
                  break;
                }                    
              }
              return { id, isRatedByUser, ...data };
            });
         });
       }
      );
      this.translationLoader.loadTranslations(english, spanish);
      

      this.categoriesCollection = this.db.collection('categories');
      this.categories = this.categoriesCollection.valueChanges();

    }

    testInput(courseName: String){

      const courseNameComparison = courseName.toLowerCase();
      const searchBarInputComparison = this.searchBarInput.toLowerCase();

      return courseNameComparison.indexOf(searchBarInputComparison) !== -1;
    }



    redirectToGames(courseID){
      this.router.navigate(['/teacher/courses/' + courseID + '/games']);
    }





    deleteCourse(courseID: string){
      this.db.collection('courses').doc(courseID).snapshotChanges().subscribe(document => {
        const data = document.payload.data();
        this.auth.user.subscribe( userData => {
          if (userData.uid === data.createdBy){
            this.db.collection('courses').doc(courseID).delete();
          }
        });
      });

      
    }

 }


