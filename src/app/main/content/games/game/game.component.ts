import { Component, OnInit, NgZone } from '@angular/core';
import {I18nSelectPipe} from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { Observable } from 'rxjs/Observable';
import {MatSnackBar} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';


import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

enum ComponentState {IsEditing, IsCreating}
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  // The game id of the current game, if there is one. This is actually the hash of the document
  gameID: string;
  gameForm: FormGroup;

  public ComponentState = ComponentState;
  public currentState: ComponentState = ComponentState.IsCreating;
  courseID: string;
  // The subcollection that lies in the previous document
  // gamesFB : AngularFirestoreCollection<any> = this.db.collection('courses').doc(this.courseID).collection('games');
  // currentGame in case there is a game that is being edited!
  currentGame: AngularFirestoreDocument<any>;

  constructor(private fb: FormBuilder,
              private db: AngularFirestore,
              public snackBar: MatSnackBar,
              private translationLoader: FuseTranslationLoaderService,
              private route: ActivatedRoute,
              private router: Router,
              private ngZone: NgZone) {
    this.translationLoader.loadTranslations(english, spanish);
  }

  addQuestion(){
    (<FormArray>this.gameForm.get('questions')).push(this.fb.group({
          question: [null, Validators.required],
          answers : this.fb.array([
                this.fb.group({
                  answer: ['', Validators.required],
                  isCorrect: [false, Validators.required]
              })
          ]),
          type : 'multiple_choice'

        }));
  }

  addFillBlank()
  {

    (<FormArray>this.gameForm.get('questions')).push(this.fb.group({
      question: [null, Validators.required],
      answers : this.fb.array([
        this.fb.group({
          answer: ['', Validators.required],
        })
      ]),
      type : 'fill_blank'

    }));
  }

  deleteQuestion(selectedQuestionIndex){
    const control = <FormArray>this.gameForm.get('questions');
    // remove the chosen row
    control.removeAt(selectedQuestionIndex);
  }

  onSubmit() {
    console.log(this.courseID);
    if (this.gameForm.valid){
      // The actions for onSubmit vary depending on what the user is doing
      if (this.currentState === ComponentState.IsCreating){
        let data = this.gameForm.value;
          this.db.collection('courses').doc(this.courseID).collection('games').add({
            name : data.name,
            description : data.description,
            isPublic : data.isPublic,
            questions : data.questions,
          });
          this.snackBar.open('¡Se ha creado el juego con éxito!', '', {
            duration: 2000,
            verticalPosition: 'top'
          });
      }
      else{
        let data = this.gameForm.value;

          this.db.collection('courses').doc(this.courseID).collection('games').doc(this.gameID).set({
          name : data.name,
          description : data.description,
          isPublic : data.isPublic,
          questions : data.questions,
        });
        this.snackBar.open('¡Se ha editado exitosamente el juego con éxito!', '', {
          duration: 2000,
          verticalPosition: 'top'
        });
      }
      this.resetForm();
    }
  }

  deleteAnswer(currentQuestionIndex, selectedAnswerIndex){
    var questionsArray : FormArray = <FormArray>this.gameForm.get('questions');
    var selectedQuestion : FormGroup = <FormGroup> questionsArray.controls[currentQuestionIndex];
    var answersArray = <FormArray> selectedQuestion.get('answers');
    answersArray.removeAt(selectedAnswerIndex);
  }

  addAnswer(selectedQuestionIndex){
    var questionsArray : FormArray = <FormArray>this.gameForm.get('questions');
    var selectedQuestion : FormGroup = <FormGroup> questionsArray.controls[selectedQuestionIndex];
    var answersArray = <FormArray> selectedQuestion.get('answers');
    answersArray.push(this.fb.group({
      answer: ['', Validators.required],
      isCorrect: [false, Validators.required]
    }));
  }

  addFillAnswer(selectedQuestionIndex){
    var questionsArray : FormArray = <FormArray> this.gameForm.get('questions');
    var selectedQuestion : FormGroup = <FormGroup> questionsArray.controls[selectedQuestionIndex];
    var answersArray = <FormArray> selectedQuestion.get('answers');
    answersArray.push(this.fb.group({
      answer: ['', Validators.required]
    }));
  }

  ngOnInit() {
      // The form is reset to empty values
      this.resetForm();
      // We get the game ID from the RESTFUL URL
      // Now we check if the current URL is a game edit. If so, set up everything
      if ((this.router.url).indexOf('game/edit') !== -1){
        this.currentState = ComponentState.IsEditing;
        this.route.params.subscribe(params => {
            this.gameID = params['game_id'];
            this.courseID = params['course_id'];
            console.log(params['course_id']);
            console.log(this.courseID);
            this.currentGame = this.db.collection('courses').doc(this.courseID).collection('games').doc(this.gameID);
            const doc: Observable<any> = this.currentGame.valueChanges();
            doc.subscribe(data => {
              console.log(data);
              this.dataToForm(data);
            });
         });
      }
      // If it is not a game edit, we set up the course id
      else{
        this.route.params.subscribe(params => {
            this.courseID = params['course_id'];
         });
      }
  }

  OnInit(){

  }

  // This parses the data received from Firebase to a FormGroup
  dataToForm(data: any){
    this.gameForm.patchValue(data);
    // For each question, we create a form group with its controls and the answers FormArray
    data.questions.forEach(q => {
        (<FormArray>this.gameForm.get('questions')).push(this.fb.group({
          type : ['', Validators.required],
          question: [q.question, Validators.required],
          answers : this.fb.array([
          ])
        }));
    });

    // Now for each answer, we add it into the FormArray of answers
    // of each question previously created
    for (var i = 0; i < data.questions.length; i++){
      var q : any = data.questions[i];
      var questionGroup : FormGroup = <FormGroup>(<FormArray>this.gameForm.get('questions')).at(i);
      var answersArray : FormArray = (<FormArray>questionGroup.get('answers'));
      for (var j = 0; j < q.answers.length; j++){
        answersArray.push(this.fb.group({
          answer: [q.answers[j].answer, Validators.required],
          isCorrect: [q.answers[j].isCorrect, Validators.required]
        }));
      }
    }
  }

  resetForm(){
    this.gameForm = this.fb.group({
        name: [null, Validators.required],
        description: [null, Validators.required],
        isPublic: [false, Validators.required],
        questions: this.fb.array([

        ])

    });
  }

}
