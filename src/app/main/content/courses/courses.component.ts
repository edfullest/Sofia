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


    public isCreator = false ;
    coursesCollection: AngularFirestoreCollection<any[]>;
    courses: Observable<any[]>;
    categoriesCollection: AngularFirestoreCollection<any[]>;
    categories: Observable<any[]>;
    categorySelected = 'All';

    public searchBarInput = '';


    
    constructor(public translationLoader: FuseTranslationLoaderService, 
                public db: AngularFirestore, 
                public router: Router,
                public auth: AuthService)
    {
      
        this.translationLoader.loadTranslations(english, spanish);
        // this.categoriesCollection = this.db.collection('categories');
        // this.categories = this.categoriesCollection.valueChanges();

    }

    testInput(courseName: String) : boolean {

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


