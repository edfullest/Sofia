import { Component } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { RecentQuestionsModule } from '../recent-questions/recent-questions.module'
import { RecentQuestionsComponent } from '../recent-questions/recent-questions.component'
import {AddQuestionComponent} from '../recent-questions/add-question/add-question.component'

import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '../../../core/animations';
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
export class GamesViewComponent{

    games: Observable<any[]>;
    isPressed : boolean = false;

    constructor(private translationLoader: FuseTranslationLoaderService, private db: AngularFirestore, router: Router)
    {
        this.translationLoader.loadTranslations(english, spanish);
        this.games = this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT').collection('games').snapshotChanges().map(document => {
          return document.map(documentData => {
            const data = documentData.payload.doc.data();
            const id = documentData.payload.doc.id;
            return { id, ...data };
          });
        });
    }

    deleteDocument(id: string){
         this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT').collection('games').doc(id).delete();
    }
}
