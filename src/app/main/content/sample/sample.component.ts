import { Component } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
    selector   : 'fuse-sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class FuseSampleComponent
{
    courses: Observable<any[]>;
    constructor(private translationLoader: FuseTranslationLoaderService, db: AngularFirestore)
    {
        this.translationLoader.loadTranslations(english, turkish);
        this.courses = db.collection('courses').valueChanges();

    }
}
