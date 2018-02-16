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
  constructor(private db: AngularFirestore) {

  }

  filterByHashtag(hashtagObj){
      console.log(hashtagObj.hashtag)
        this.questions = this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT')
                                .collection('questions', ref => 
                                ref.where("hashtags.Sofia", '==', 'true'))
                                .snapshotChanges().map(document => {
                                  return document.map(documentData => {
                                    const data = documentData.payload.doc.data();
                                    const id = documentData.payload.doc.id;
                                    const hashtagsArray = []
                                    const hashtags = data.hashtags
                                    for (var key in hashtags) {
                                      hashtagsArray.push(JSON.parse(key))
                                    }
                                    return { id,hashtagsArray,...data };
                                  });
                                });
    
  }

  ngOnInit() {
      this.questions = this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT').collection('questions').snapshotChanges().map(document => {
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
      this.hashtags = this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT').collection('hashtags').snapshotChanges().map(document => {
          return document.map(documentData => {
            const data = documentData.payload.doc.data();
            const id = documentData.payload.doc.id;
            return { id, ...data };
          });
        });

  }

}
