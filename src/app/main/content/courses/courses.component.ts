import { Component } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from 'angularfire2/firestore';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '../../../core/animations';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';
import { FirebaseDatabase } from '@firebase/database-types';
import { FuseIfOnDomDirective } from '../../../core/directives/fuse-if-on-dom/fuse-if-on-dom.directive';
import { FirebaseApp, FirebaseAppProvider } from 'angularfire2';
import { FirebaseFirestore, DocumentReference } from '@firebase/firestore-types';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector   : 'courses-view',
  templateUrl: './courses.component.html',
  styleUrls  : ['./courses.component.scss'],
  animations   : fuseAnimations,
  providers : [],
  })

  export class CoursesComponent{

    coursesCollection: AngularFirestoreCollection<any[]>;
    courses: Observable<any[]>;
    categoriesCollection: AngularFirestoreCollection<any[]>;
    categories: Observable<any[]>;
    categorySelected = 'ALL';

    constructor(private translationLoader: FuseTranslationLoaderService, private db: AngularFirestore, private router: Router)
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

    redirectToGames(courseID){
      this.router.navigate(["courses/" +courseID + "/games"])
    }

    findReference(ref: any){

    }

    deleteCourse(courseID: string){
      this.db.collection('courses').doc(courseID).delete();
    }

 }


