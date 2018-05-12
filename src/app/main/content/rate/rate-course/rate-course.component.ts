import { Component, OnInit } from '@angular/core';
import { RateComponent } from '../rate.component';
import { MatCardModule} from '@angular/material/card';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../auth/auth.service';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { locale as english } from '../i18n/en';
import { locale as spanish } from '../i18n/es';

@Component({
  selector: 'app-rate-course',
  templateUrl: './rate-course.component.html',
  styleUrls: ['./rate-course.component.scss']
})
export class RateCourseComponent extends RateComponent implements OnInit {

    courseID: string;

  constructor(db: AngularFirestore, fbApp: FirebaseApp,  router: Router,
              private route: ActivatedRoute,
              public auth: AuthService,
              public translationLoader: FuseTranslationLoaderService ) {
      super(db, fbApp, router, auth);


      this.translationLoader.loadTranslations(english, spanish);


   }

  ngOnInit() {
      this.route.params.subscribe(params => {
            this.courseID = params['course_id'];
            console.log(params['course_id']);
            console.log(this.courseID);
            this.document = this.db.collection('courses').doc(this.courseID);
            const doc: Observable<any> = this.document.snapshotChanges().map(docData => {
                const data = docData.payload.data();
                const id = docData.payload.id;
                return { id, ...data };

            });
         });
  }
  makeTransaction(isThumbsUp){
      this.auth.user.subscribe(userData => {
          console.log(userData);
      });
      console.log(this.auth.user);

      this.returnURL = 'courses';
      super.makeTransaction(isThumbsUp);
  }

}
