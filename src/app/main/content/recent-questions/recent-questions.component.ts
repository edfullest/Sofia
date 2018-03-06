import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Route, Router } from "@angular/router"
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-recent-questions',
  templateUrl: './recent-questions.component.html',
  styleUrls: ['./recent-questions.component.scss']
})
export class RecentQuestionsComponent implements OnInit {
  courseID : string;
  questions : Observable<any[]>;
  hashtags : Observable<any[]>;
  unselectedHashtags : Observable<any[]>;
  answers: [any];
  selectedHashtags : any[] = new Array();
  questionCollectionReference : AngularFirestoreCollection<any>;
  constructor(private db: AngularFirestore, private router: Router,
              private route : ActivatedRoute,
              public auth : AuthService) {
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
       if (hashtag.matChipClass == "mat-light-blue-900-bg" ){
          hashtag.matChipClass = "mat-accent-bg"
          // We remove the selected hashtag in case the user selects one that is already selected
          this.selectedHashtags = this.selectedHashtags.filter(function(selectedHashtag) { 
            return selectedHashtag !== hashtag.hashtag
          })
       }
       else{
          hashtag.matChipClass = "mat-light-blue-900-bg"
          this.selectedHashtags.push(hashtag.hashtag)
       }

   }

   removeFilters(hashtags){
     this.getHashtags()
     this.selectedHashtags.length = 0
   }

   sendAnswer(question){
     this.db.collection('courses').doc(this.courseID)
                                  .collection('questions')
                                  .doc(question.id).update({
                                    answer: question.answer
                                   })

   }

   isHashtagInSelectedHashtag(hashtagsArray){
      var selectedHashtagsAsString : string = JSON.stringify(this.selectedHashtags);
      var contains = hashtagsArray.find(function(elem){
        return selectedHashtagsAsString.includes(elem);
      });
      return contains;
  }

   // We only show a question if its hashtags are 
   shouldShowQuestion(hashtagsArray){
     // If there are no selected hashtags, return true (aka, we show that question)
     if (this.selectedHashtags.length == 0){
       return true
     }
     return this.isHashtagInSelectedHashtag(hashtagsArray)
   }



  ngOnInit() {
    this.route.params.subscribe(params => {
        this.courseID = params["course_id"]
        this.initialize()
    });
  }

  getHashtags(){
    this.hashtags = this.db.collection('courses').doc(this.courseID).collection('hashtags').snapshotChanges().map(document => {
          return document.map(documentData => {
            const data = documentData.payload.doc.data();
            const id = documentData.payload.doc.id;
            var matChipClass = "mat-accent-bg";
            return { id,matChipClass,...data };
          });
        });
  }

  initialize(){
    this.questionCollectionReference = this.db.collection('courses').doc(this.courseID).collection('questions')
    this.triggerQuestionChanges()
    this.getHashtags()
    
  }

}


