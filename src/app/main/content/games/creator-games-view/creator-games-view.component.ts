import { Component, OnInit } from '@angular/core';
import { GamesViewComponent } from '../games-view.component';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '../../../../core/animations';
import { AuthService } from '../../../../auth/auth.service';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';

@Component({
    selector   : 'creator-games-view',
    templateUrl: '../games-view.component.html',
    styleUrls  : ['../games-view.component.scss'],
    animations   : fuseAnimations,
    providers: [
    // {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}
  ],
})

export class CreatorGamesViewComponent extends GamesViewComponent {
    isCreator = true;
    constructor(translationLoader: FuseTranslationLoaderService, db: AngularFirestore,
                router: Router,
                route: ActivatedRoute,
                auth: AuthService)
    {
        super(translationLoader, db, router, route , auth);
    }
}
