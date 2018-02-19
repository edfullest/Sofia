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
  answers: [any];
  questionCollectionReference : AngularFirestoreCollection<any> = 
                  this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT').collection('questions');
  constructor(private db: AngularFirestore) {

  }

  triggerQuestionChanges(){
      this.questions = this.questionCollectionReference.snapshotChanges().map(document => {
          console.log(document)
          return document.map(documentData => {
            const data = documentData.payload.doc.data();
            const id = documentData.payload.doc.id;
            const hashtagsArray = []
            const hashtags = data.hashtags
            const originalAnswer = data.answer
            for (var key in hashtags) {
              hashtagsArray.push(key)
            }
            return { id,hashtagsArray,originalAnswer,...data };
          });
        });
   }

   filterByHashtag(hashtag){
       this.questionCollectionReference = this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT')
                                .collection('questions', ref => 
                                ref.where("hashtags." + hashtag, '==', true))
       this.triggerQuestionChanges()
   }

   sendAnswer(question){
     this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT')
                                  .collection('questions')
                                  .doc(question.id).update({
                                    answer: question.answer
                                   })

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


