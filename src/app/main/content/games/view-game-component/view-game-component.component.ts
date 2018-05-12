import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { RateGameComponent } from '../../rate/rate-game/rate-game.component';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';
import { AuthService } from '../../../../auth/auth.service';
import { PlatformLocation } from '@angular/common';

import { GameData } from '../models/gameData';

@Component({
  selector: 'app-view-game-component',
  templateUrl: './view-game-component.component.html',
  styleUrls: ['./view-game-component.component.scss']
})

export class ViewGameComponentComponent implements OnInit {

  gameForm: FormGroup;

  isRateViewActive: boolean;
  gameCollection: AngularFirestoreCollection<GameData>;
  gameData: GameData;
  gameDoc: AngularFirestoreDocument<GameData>;
  roleType: string;
  courseID: string;
  gameID: string;

  userUID: string;
  student: string;
  author: string;


  score: number;
  totalScore: number;

  answer_array: number[];

  firstTime:boolean;

  cumulativeDoc:Object;

  constructor(private formBuilder: FormBuilder,
    private db: AngularFirestore,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private translationLoader: FuseTranslationLoaderService,
    private router: Router,
    private platformLocation: PlatformLocation,
    private ngZone: NgZone,
    private auth: AuthService) {

      this.translationLoader.loadTranslations(english, spanish);
      this.auth.user.subscribe(userData => {
        this.userUID = userData.uid;
        this.student = userData.displayName;
        this.hasBeenTaken()
        this.getCumulative()
      });
  }

  ngOnInit() {
    // The form is reset to empty values
    this.resetForm();
    // We get the game ID from the RESTFUL URL
    this.route.params.subscribe(params => {
        this.gameID = params['game_id'];
        this.courseID = params['course_id'];
        this.gameDoc = this.db.collection('courses').doc(this.courseID).collection('games').doc(this.gameID);
        const doc: Observable<GameData> = this.gameDoc.valueChanges();
        doc.subscribe(data => this.gameData = data);
        doc.subscribe(data => {
          this.dataToForm(data);
        });
    });
    const document = this.db.collection('courses').doc(this.courseID);
    const observable = document.snapshotChanges().map(docData => {
      const data = docData.payload.data();
      this.author = data.createdBy;
    });
  }

  // This parses the data received from Firebase to a FormGroup
  dataToForm(data: any){
    this.gameForm.patchValue(data);

    // For each question, we create a form group with its controls and the answers FormArray
    data.questions.forEach(q => {


      if (q.type === 'multiple_choice'){

        (<FormArray>this.gameForm.get('questions')).push(this.formBuilder.group({
          type : [q.type],
          question: [q.question, Validators.required],
          answers : this.formBuilder.array([
          ])
        }));

      }else{

        (<FormArray>this.gameForm.get('questions')).push(this.formBuilder.group({
          type : [q.type],
          answers : this.formBuilder.array([
          ])
        }));

      }

    });

    // Now for each answer, we add it into the FormArray of answers
    // of each question previously created
    for (let i = 0; i < data.questions.length; i++){
      const q: any = data.questions[i];
      const questionGroup: FormGroup = <FormGroup>(<FormArray>this.gameForm.get('questions')).at(i);
      const answersArray: FormArray = (<FormArray>questionGroup.get('answers'));

      console.log(q);
      if (q.type === 'multiple_choice'){
        for (let j = 0; j < q.answers.length; j++){
          answersArray.push(this.formBuilder.group({
            answer: [q.answers[j].answer, Validators.required],
            isCorrect: [false, Validators.required],
          }));
        }
      }else{

        for (let j = 0; j < q.answers.length; j++){
          if (q.answers[j].isBlank === true)
          {
            answersArray.push(this.formBuilder.group({
              name: [''],
              isBlank: [q.answers[j].isBlank],
              color : [q.answers[j].color]
            }));
          }
          else
          {
            answersArray.push(this.formBuilder.group({
              name: [q.answers[j].name],
              isBlank: [q.answers[j].isBlank],
              color : [q.answers[j].color]
            }));
          }
        }

      }

    }
  }

  // This method calculates the grade of the student.
  calculateScore(){

    this.totalScore = 100;
    this.score = 100;

    const numQuestions = this.gameData.questions.length;

    const answerForm = JSON.parse(JSON.stringify(this.gameForm.value));

    this.answer_array = new Array(numQuestions);

    for (let i = 0; i < this.gameData.questions.length; i++)
    {
      const q: any = this.gameData.questions[i];
      let count = 0;

      for (let j = 0; j < q.answers.length; j++)
      {
        if (q.type === 'multiple_choice' && q.answers[j].isCorrect === true)
        {
          count++;
        }
        else
        {
          if (q.answers[j].isBlank === true)
          {
            count++;
          }

        }
      }

      this.answer_array[i] = count;
    }


    for (let i = 0; i < this.gameData.questions.length; i++)
    {
      const q: any = this.gameData.questions[i];
      const qForm: any = answerForm.questions[i];



      for (let j = 0; j < q.answers.length; j++){

        if (q.type === 'multiple_choice')
        {

          // if the answer is not the same as the one of the teacher
          if ( !(qForm.answers[j].isCorrect === q.answers[j].isCorrect))
          {
            this.score = this.score - ( (this.totalScore / numQuestions) / this.answer_array[i]);
          }
        }
        else{

          const typedAnswer = qForm.answers[j].name.toUpperCase();
          const correctAnswer = q.answers[j].name.toUpperCase();
          // if the answer is not the same as the one of the teacher
          if ( !(typedAnswer === correctAnswer))
          {
            this.score = this.score - ( (this.totalScore / numQuestions) / this.answer_array[i]);
          }

        }
      }
    }

    this.score = Math.round(this.score * 100) / 100;

    if (this.score < 0){
      this.score = 0;
    }
    else if (this.score > 100){
      this.score = 100;
    }

  }


  onSubmit(){
    if (this.gameForm.valid){
      // get the student 'grade' depending of the correct answers
      this.calculateScore();

      // submit data to Firebase
      const data = this.gameForm.value;
      this.db.collection('courses').doc(this.courseID).collection('games')
        .doc(this.gameID).collection('submissions')
          .add({
            studentId: this.userUID,
            studentName: this.student,
            score: this.score,
            firstTime: this.firstTime,
            questions: data.questions

          });

          if(this.firstTime){
              this.cumulativeDoc['totalScore'] += this.score;
              this.cumulativeDoc['gamesCompleted'] +=1;

                if(this.cumulativeDoc['id']){
                    this.db.collection('courses').doc(this.courseID).collection('cumulatives').doc(this.cumulativeDoc['id']).set(this.cumulativeDoc, { merge: true });
                 }
                 else{
                     this.db.collection('courses').doc(this.courseID).collection('cumulatives').add(this.cumulativeDoc);
                     //console.log('insert')
                 }

          }


          this.snackBar.open('¡Se ha subido el juego con éxito!', '', {
            duration: 2000,
            verticalPosition: 'top'
          });
          this.isRateViewActive = true;

    }

  }

  resetForm(){
    this.gameForm = this.formBuilder.group({
        studentId: [null],
        studentName: [null],
        score: [null],
        questions: this.formBuilder.array([

        ])

    });
  }

  redirectToGames(){
    this.resetForm();
    // Checamos que el creador del curso sea el mismo que quiera realizar un submission
      if (this.userUID === this.author)
      {
        this.router.navigate(['/teacher/courses/' + this.courseID + '/games' ]);
      }
      // si no es, se redirige a un estudiante
      else
      {
        this.router.navigate(['/student/courses/' + this.courseID + '/games' ]);
      }

  }

  hasBeenTaken(){
      let x:Promise<any>;
      x = this.db.collection('courses').doc(this.courseID).collection('games')
          .doc(this.gameID).collection('submissions').ref
          .where("studentId", "==", this.userUID).get()

      x.then((col) => {console.log(col)
      this.firstTime = col.empty;
      console.log("firstTime:" + this.firstTime);
      });
  }

  getCumulative(){
      /*
      // Create a reference to the SF doc.
      var sfDocRef = this.db.collection('courses').doc(this.courseID).collection('cumulatives').ref
          .where("studentId", "==", this.userUID)

      sfDocRef.then((query) => {
          if (query.empty){
              this.cumulativeDoc = {
                  studentName: this.student,
                  studentId: this.userUID,
                  gameScore:0,
                  gamesCompleted:1
                  }
          } else{
            this.cumulativeDoc = query.docs[0];
          }
          console.log(this.cumulativeDoc)
      });
      */

      let col : AngularFirestoreCollection<any>;
      let cumulative : Observable<any>;
      col = this.db.collection('courses').doc(this.courseID)
                               .collection('cumulatives', ref =>
                               ref.where("studentId", '==', this.userUID));

   cumulative = col.snapshotChanges().map( document => {
       return document.map(a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           return { id, ...data };
           });
        });

   cumulative.subscribe(docs => {
       console.log(docs);
       if(docs.length){this.cumulativeDoc=docs[0]}
       else{
           this.cumulativeDoc = {
                  studentName: this.student,
                  studentId: this.userUID,
                  totalScore:0,
                  gamesCompleted:0
                  };
       }
       console.log(this.cumulativeDoc)
       });




      }


}
