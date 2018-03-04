import { Component, OnInit } from '@angular/core';
import {RateComponent } from '../rate.component'
import {MatCardModule} from '@angular/material/card';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { Router } from "@angular/router";
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'rate-game',
  templateUrl: './rate-game.component.html',
  styleUrls: ['./rate-game.component.scss']
})
export class RateGameComponent extends RateComponent implements OnInit {
   game : Observable<any>

  constructor(db: AngularFirestore, fbApp: FirebaseApp,  router: Router, auth: AuthService) {
      super(db, fbApp, router, auth);
      
   }

  ngOnInit() {
    this.auth.user.subscribe( userData => {
        this.game = this.document.snapshotChanges().map(docData => {
            const data = docData.payload.data();
            const id = docData.payload.id
            var isRatedByUser = false
                for (var uid in data.usersThatRated) {
                  if (uid == userData.uid){
                    isRatedByUser = true
                    break;
                  }

                }
              return { id,isRatedByUser,...data };

         });
          
    })       
  }


  

}

