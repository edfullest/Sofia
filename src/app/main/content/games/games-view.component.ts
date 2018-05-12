import { Component, OnInit, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { RecentQuestionsModule } from '../recent-questions/recent-questions.module';
import { RecentQuestionsComponent } from '../recent-questions/recent-questions.component';
import { AddQuestionComponent } from '../recent-questions/add-question/add-question.component';

import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '../../../core/animations';
import { AuthService } from '../../../auth/auth.service';
// import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material';


/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 0,
};

@Component({
    selector   : 'games-view',
    templateUrl: './games-view.component.html',
    styleUrls  : ['./games-view.component.scss'],
    animations   : fuseAnimations,
    providers: [
    // {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}
  ],
})

export class GamesViewComponent implements OnInit{

    games: Observable<any[]>;
    isPressed : boolean = false;
    courseID : string;
    isCreator : boolean = false
    courseName : string = ""
    constructor(public translationLoader: FuseTranslationLoaderService, public db: AngularFirestore,
                public router: Router,
                public route : ActivatedRoute,
                public auth : AuthService)
    {
        this.translationLoader.loadTranslations(english, spanish);
    }

    loadGames(){
      this.games = this.db.collection('courses').doc(this.courseID).collection('games').snapshotChanges().map(document => {
          return document.map(documentData => {
            const data = documentData.payload.doc.data();
            const id = documentData.payload.doc.id;
            return { id, ...data };
          });
       });

      this.db.collection('courses').doc(this.courseID).snapshotChanges().subscribe(document => {
        const data = document.payload.data();
        this.courseName = data.name
      })

    }

    pressButton(){
      this.isPressed = !this.isPressed;
    }

    deleteDocument(id: string){
      this.db.collection('courses').doc(this.courseID).snapshotChanges().subscribe(document => {
        const data = document.payload.data();
        this.auth.user.subscribe( userData => {
          if (userData.uid == data.createdBy){
              this.db.collection('courses').doc(this.courseID).collection('games').doc(id).delete();
          }
        })
      })
    }

    ngOnInit() {
      this.route.params.subscribe(params => {
          this.courseID = params["course_id"]
          this.loadGames()
       });
    }

    redirectToGames(gameID : string){
      this.router.navigate(['/courses/' + this.courseID + '/game/view/' + gameID])
    }
    
    redirectToTopScores(){
        console.log(this.courseID)
       this.router.navigate(['/student/courses/' + this.courseID + '/topscores']);
    }

   redirectToGameTopScores(gameID:string){
        console.log(gameID)
       this.router.navigate(['/student/courses/' + this.courseID + '/game/'+ gameID+ '/topscores']);
    }
        
    OnInit(){

    }
}

// export class CreatorGamesViewComponent extends GamesViewComponent{
//     isCreator : boolean = true
//     constructor(translationLoader: FuseTranslationLoaderService, db: AngularFirestore,
//                 router: Router,
//                 route : ActivatedRoute,
//                 auth : AuthService)
//     {
//         super(translationLoader,db,router,route,auth)
//     }

// }

// export class ViewerGamesViewComponent extends GamesViewComponent{
//     isCreator : boolean = false
//     constructor(translationLoader: FuseTranslationLoaderService, db: AngularFirestore,
//                 router: Router,
//                 route : ActivatedRoute,
//                 auth : AuthService)
//     {
//         super(translationLoader,db,router,route,auth)
//     }
// }

   // constructor(translationLoader: FuseTranslationLoaderService, db: AngularFirestore,
   //              router: Router,
   //              route : ActivatedRoute,
   //              auth : AuthService)
   //  {
   //      super(translationLoader,db,router,route,auth)
   //  }

