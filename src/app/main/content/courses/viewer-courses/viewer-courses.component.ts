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
import { locale as english } from '../i18n/en';
import { locale as spanish } from '../i18n/es';

@Component({
  selector   : 'viewer-courses-view',
  templateUrl: '../courses.component.html',
  styleUrls  : ['../courses.component.scss'],
  animations   : fuseAnimations,
  providers : [],
  })

  export class ViewerCoursesComponent extends CoursesComponent{

    isCreator : boolean = false 
    
    constructor( translationLoader: FuseTranslationLoaderService, 
                 db: AngularFirestore, 
                 router: Router,
                 auth : AuthService)
    {

        super(translationLoader,db,router,auth)
        this.auth.user.subscribe( userData => {
        this.coursesCollection = this.db.collection('courses', ref => 
                               ref.where("students." + userData.uid, '==', true));
        this.courses = this.coursesCollection.snapshotChanges().map(document => {
            return document.map(documentData => {
              const data = documentData.payload.doc.data();
              const id = documentData.payload.doc.id;
              // We check if the user already rated that course
              var isRatedByUser = false
              for (var uid in data.usersThatRated) {
                if (uid == userData.uid){
                  isRatedByUser = true
                  break;
                }                    
              }
              return { id,isRatedByUser, ...data };
            });
         });
       })
    }

    redirectToGames(courseID){
      this.router.navigate(["/student/courses/" +courseID + "/games"])
    }

    deleteCourse(){
      
    } 
 }




