import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Route, Router } from "@angular/router"

@Component({
  selector: 'app-recent-questions',
  templateUrl: './recent-questions.component.html',
  styleUrls: ['./recent-questions.component.scss']
})
export class RecentQuestionsComponent implements OnInit {
  courseID : string;
  questions : Observable<any[]>;
  hashtags : Observable<any[]>;
  answers: [any];
  questionCollectionReference : AngularFirestoreCollection<any>;
  constructor(private db: AngularFirestore, private router: Router,
              private route : ActivatedRoute) {
  }

  triggerQuestionChanges(){
      this.questions = this.questionCollectionReference.snapshotChanges().map(document => {
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
       this.questionCollectionReference = this.db.collection('courses').doc(this.courseID)
                                .collection('questions', ref => 
                                ref.where("hashtags." + hashtag, '==', true))
       this.triggerQuestionChanges()
   }

   sendAnswer(question){
     this.db.collection('courses').doc(this.courseID)
                                  .collection('questions')
                                  .doc(question.id).update({
                                    answer: question.answer
                                   })

   }



  ngOnInit() {
    this.route.params.subscribe(params => {
        this.courseID = params["course_id"]
        this.initialize()
    });
  }

  initialize(){
    this.questionCollectionReference = this.db.collection('courses').doc(this.courseID).collection('questions')
    this.triggerQuestionChanges()
    this.hashtags = this.db.collection('courses').doc(this.courseID).collection('hashtags').snapshotChanges().map(document => {
          return document.map(documentData => {
            const data = documentData.payload.doc.data();
            const id = documentData.payload.doc.id;
            return { id, ...data };
          });
        });
  }

}


