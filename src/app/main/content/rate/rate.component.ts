import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { Router } from "@angular/router";
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-rate',
  template: ''
})
export class RateComponent {
    @Input() document : AngularFirestoreDocument<any>
    // We give in the return URL after doing the rating
    @Input() returnURL : string

    constructor(public db: AngularFirestore, public fbApp: FirebaseApp, private router: Router, public auth : AuthService){

    }

    makeTransaction(isThumbsUp){
      // We make a transaction so that we take into account parallel writes
      this.fbApp.firestore().runTransaction(transaction => {
             return transaction.get(this.document.ref).then(data => {
                var positive = data.data().rating.positive
                var negative = data.data().rating.negative
                if (isThumbsUp){
                    positive += 1;
                }
                else{
                    negative += 1;
                }
                transaction.update(this.document.ref, { rating: {positive: positive , negative: negative }  });
          });
        });
        var users = {};
        this.auth.user.subscribe(userData => {
            users[userData.uid] = true;

            this.document.update({
                usersThatRated:users
             })
        })

     }

     giveThumbsUp(){
         this.makeTransaction(true)
         // this.router.navigate([this.returnURL])
     }

     giveThumbsDown(){
         this.makeTransaction(false)
         // this.router.navigate([this.returnURL])
     }
}
