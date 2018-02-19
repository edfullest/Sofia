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
<<<<<<< HEAD
import { FirebaseFirestore } from '@firebase/firestore-types';
=======
import { FirebaseFirestore, DocumentReference } from '@firebase/firestore-types';
>>>>>>> e9d79b2fe6732f9564ae3bf14b119401422ba917
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

<<<<<<< HEAD
=======
    categorySelected = 'ALL';

>>>>>>> e9d79b2fe6732f9564ae3bf14b119401422ba917
    constructor(private translationLoader: FuseTranslationLoaderService, private db: AngularFirestore, router: Router)
    {
      this.translationLoader.loadTranslations(english, spanish);
      this.coursesCollection = this.db.collection('courses');
      this.courses = this.coursesCollection.valueChanges();
      this.categoriesCollection = this.db.collection('categories');
      this.categories = this.categoriesCollection.valueChanges();
<<<<<<< HEAD
    }

    findReference(ref: any){

    }


  }
=======

    }

  }


>>>>>>> e9d79b2fe6732f9564ae3bf14b119401422ba917
