import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA, SPACE} from '@angular/cdk/keycodes';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  visible: boolean = true;
  selectable: boolean = false;
  removable: boolean = true;
  addOnBlur: boolean = true;
  pregunta: string = "";
  @Input() isBackButtonPressed : boolean;
  @Output() outputEvent:EventEmitter<boolean>=new EventEmitter<boolean>();
  separatorKeysCodes = [ENTER, COMMA, SPACE];
  //hashtags : Observable<any[]>;
  hashtags = [
  ];
    
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
      
  }
  
 submit(){
      this.addQuestion();
  }
  
    addQuestion(){
        
      var hashtagObj  = {}
      for(var index in this.hashtags){
        let htag = this.hashtags[index].name;
        console.log(htag)

        hashtagObj[htag] = true;

        let col : AngularFirestoreCollection<any>;
        let id : Observable<any>;

        col = this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT')
                                 .collection('hashtags', ref => 
                                 ref.where("hashtag", '==', htag));

         console.log(col);

      id = col.snapshotChanges().map( document => {
         return document.map(a => {
             const data = a.payload.doc.data();
             const idDoc = a.payload.doc.id;
             return { idDoc, ...data };
             });
      });

       id.first().subscribe(data => {
           console.log(data);
               if (data.length==0){
                     console.log(htag);
                     this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT')
                         .collection('hashtags').add({count: 1, hashtag: htag});
               } else{
                     let total = data[0].count + 1;
                     this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT')
                         .collection('hashtags').doc(data[0].idDoc).set({count: total},{ merge: true });
               }
         });

       }
      
      var question = {answer:"", hashtags:hashtagObj, question: this.pregunta}
      this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT')
           .collection('questions').add(question);
      // Return to questions
      this.outputEvent.emit(false)
  }
  
  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add hashtag
    if ((value || '').trim()) {
      this.hashtags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(hashtag: any): void {
    let index = this.hashtags.indexOf(hashtag);
    if (index >= 0) {
      this.hashtags.splice(index, 1);
    }
  }
  
}