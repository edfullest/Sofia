import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-recent-questions',
  templateUrl: './recent-questions.component.html',
  styleUrls: ['./recent-questions.component.scss']
})
export class RecentQuestionsComponent implements OnInit {

  questions : Observable<any[]>;
  hashtags : Observable<any[]>;
  questionCollectionReference : AngularFirestoreCollection<any> = 
                  this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT').collection('questions');
  constructor(private db: AngularFirestore) {

  }

  triggerQuestionChanges(){
      this.questions = this.questionCollectionReference.snapshotChanges().map(document => {
          return document.map(documentData => {
            const data = documentData.payload.doc.data();
            const id = documentData.payload.doc.id;
            const hashtagsArray = []
            const hashtags = data.hashtags
            for (var key in hashtags) {
              hashtagsArray.push(key)
            }
            return { id,hashtagsArray,...data };
          });
        });
   }

   filterByHashtag(hashtagObj){
       console.log(hashtagObj.hashtag)
       this.questionCollectionReference = this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT')
                                .collection('questions', ref => 
                                ref.where("hashtags." + hashtagObj.hashtag, '==', true))
       this.triggerQuestionChanges()
   }

  ngOnInit() {
      this.triggerQuestionChanges()
      this.hashtags = this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT').collection('hashtags').snapshotChanges().map(document => {
          return document.map(documentData => {
            const data = documentData.payload.doc.data();
            const id = documentData.payload.doc.id;
            return { id, ...data };
          });
        });

  }

}


