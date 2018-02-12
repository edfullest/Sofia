import { Component } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';


import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {Router} from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '../../../core/animations';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material';


/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 0,
};

@Component({
    selector   : 'fuse-sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss'],
    animations   : fuseAnimations,
    providers: [
    {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}
  ],
})
export class FuseSampleComponent{

    games: Observable<any[]>;


    constructor(private translationLoader: FuseTranslationLoaderService, db: AngularFirestore, router: Router)
    {
        this.translationLoader.loadTranslations(english, turkish);
        this.games = db.collection('courses').doc('AROBb11WpOPFwPQu7xrT').collection('games').snapshotChanges().map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        });
    }

    editRoute(gameId: String){

      console.log(router);
    }
}
