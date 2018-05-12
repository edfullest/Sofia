import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA, SPACE} from '@angular/cdk/keycodes';
import { ActivatedRoute, Route, Router } from '@angular/router';


import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { locale as english } from '../i18n/en';
import { locale as spanish } from '../i18n/es';
import { AuthService } from '../../../../auth/auth.service';
import 'rxjs/add/operator/first';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  visible: boolean = true;
  courseID : string;
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

  constructor(private db: AngularFirestore, private router: Router,
              public translationLoader: FuseTranslationLoaderService,
              private route : ActivatedRoute, public auth : AuthService) {
                this.translationLoader.loadTranslations(english, spanish);
               }

  ngOnInit() {
      this.route.params.subscribe(params => {
        this.courseID = params["course_id"]
    });
  }

   submit(){
      this.addQuestion();
   }

   addQuestion(){
    var hashtagObj  = {}
    for(var index in this.hashtags){
      let htag = this.hashtags[index].name;
      hashtagObj[htag] = true;
      let col : AngularFirestoreCollection<any>;
      let id : Observable<any>;
      col = this.db.collection('courses').doc(this.courseID)
                               .collection('hashtags', ref =>
                               ref.where("hashtag", '==', htag));

      id = col.snapshotChanges().map( document => {
         return document.map(a => {
             const data = a.payload.doc.data();
             const idDoc = a.payload.doc.id;
             return { idDoc, ...data };
             });
      });

     id.first().subscribe(data => {
             if (data.length==0){
                   console.log(htag);
                   this.db.collection('courses').doc(this.courseID)
                       .collection('hashtags').add({count: 1, hashtag: htag});
             } else{
                   let total = data[0].count + 1;
                   this.db.collection('courses').doc(this.courseID)
                       .collection('hashtags').doc(data[0].idDoc).set({count: total},{ merge: true });
             }
       });
    }

    this.auth.user.subscribe( userData => {
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth()+1; //January is 0!
          var strDd : string, strMm : string
          var yyyy = today.getFullYear();
          if(dd<10){
              strDd = '0' + dd;
          }
          else{
            strDd = '' + dd;
          } 
          if(mm<10){
              strMm = '0' + mm;
          } 
          else{
            strMm = '' + mm;
          }
          var todayStr = strDd+'/'+strMm+'/'+yyyy;
          var question = {
            answer:"", 
            hashtags:hashtagObj, 
            question: this.pregunta,
            username : userData.displayName,
            photoURL : userData.photoURL,
            professorPhotoURL : "",
            dateAnswer : "",
            dateQuestion: todayStr}
          this.db.collection('courses').doc(this.courseID)
               .collection('questions').add(question);
          // Return to questions
          this.outputEvent.emit(false)
     })
    
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
