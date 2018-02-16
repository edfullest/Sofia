import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
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
    
  separatorKeysCodes = [ENTER, COMMA];
  //hashtags : Observable<any[]>;
  hashtags = [
    { name: 'testHashtag' },
  ];
    
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
      
  }
  
 submit(){
      //console.log('submitted');
      this.addQuestionOwn();
  }
  
  addHashtagToHashtagsCollection(){
       // A post entry.
  var hData = {
    count: 0,
    hashtag:"hashtagPrueba"
  };

  this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT')
      .collection('hashtags').add(hData);
      
  return; //firebase.database().ref().update(updates);
  
  }
  /*
  addQuestion(){
      
      
      for(var htag in this.hashtags){
      const col : Observable<any> = this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT')
                                .collection('hashtags', ref => 
                                ref.where("hashtag", '==', htag));
                                
      
      col.subscribe(data => {
              if (data.length == 0){
                  //this.addHashtagToHashtagsCollection(htag)

                    this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT')
                        .collection('hashtags').add({count: 0, hashtag: htag});
              } else{
                   console.log(col)
                  
                    //this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT')
                        //.collection('hashtags').doc().set({count: 0, hashtag: htag});
              }
      });
      }
  }*/
  
  
    addQuestionOwn(){
      for(var index in this.hashtags){
       var htag = this.hashtags[index].name
       console.log(htag)
       
       let col : AngularFirestoreCollection<any>;
       let id : Observable<any>;
       
       col = this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT')
                                .collection('hashtags', ref => 
                                ref.where("hashtag", '==', htag));
                            
     id = col.snapshotChanges().map( document => {
        return document.map(a => {
            const data = a.payload.doc.data();
            const idDoc = a.payload.doc.id;
            return { idDoc, ...data };
            });
     });
        console.log(col)
        console.log(id);
                              
      id.first().subscribe(data => {
          console.log(data);
              if (data.length==0){
                  console.log(data);
                  //this.addHashtagToHashtagsCollection(htag)

                    this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT')
                        .collection('hashtags').add({count: 1, hashtag: htag});
              } else{
                    let total = data[0].count + 1;
                    this.db.collection('courses').doc('AROBb11WpOPFwPQu7xrT')
                        .collection('hashtags').doc(data[0].idDoc).set({count: total, hashtag: htag});
              }
      });
      }
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