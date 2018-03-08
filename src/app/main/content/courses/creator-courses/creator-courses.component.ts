import { Component } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from 'angularfire2/firestore';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '../../../../core/animations';
import { FirebaseDatabase } from '@firebase/database-types';
import { FuseIfOnDomDirective } from '../../../../core/directives/fuse-if-on-dom/fuse-if-on-dom.directive';
import { FirebaseApp, FirebaseAppProvider } from 'angularfire2';
import { FirebaseFirestore, DocumentReference } from '@firebase/firestore-types';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../../../auth/auth.service';
import { CoursesComponent } from '../courses.component';


@Component({
  selector   : 'creator-courses-view',
  templateUrl: '../courses.component.html',
  styleUrls  : ['../courses.component.scss'],
  animations   : fuseAnimations,
  providers : [],
  })

  export class CreatorCoursesComponent extends CoursesComponent{

    isCreator : boolean = true 
    
    constructor( translationLoader: FuseTranslationLoaderService, 
                 db: AngularFirestore, 
                 router: Router,
                 auth : AuthService)
    {
        super(translationLoader,db,router,auth)
    } 
 }




