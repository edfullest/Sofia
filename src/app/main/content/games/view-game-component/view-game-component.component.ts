import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { RateGameComponent } from '../../rate/rate-game/rate-game.component';

import { GameData } from '../models/gameData';

@Component({
  selector: 'app-view-game-component',
  templateUrl: './view-game-component.component.html',
  styleUrls: ['./view-game-component.component.scss']
})

export class ViewGameComponentComponent implements OnInit {
  // courseID: string;
  gameForm: FormGroup;
  isRateViewActive : boolean = false
  gameCollection: AngularFirestoreCollection<GameData>;
  gameData: GameData;
  gameDoc: AngularFirestoreDocument<GameData>;
  courseID : string
  gameID : string
  constructor(private formBuilder: FormBuilder,
    private db: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone ) {

  }

  ngOnInit() {
    // The form is reset to empty values
    this.resetForm();
    // We get the game ID from the RESTFUL URL
    this.route.params.subscribe(params => {
        this.gameID = params['game_id'];
        this.courseID = params['course_id']
        this.gameDoc = this.db.collection('courses').doc(this.courseID).collection('games').doc(this.gameID);
        const doc: Observable<GameData> = this.gameDoc.valueChanges();
        doc.subscribe(data => this.gameData = data);
        doc.subscribe(data => {
          this.dataToForm(data);
        });
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
    for (var i = 0; i < data.questions.length; i++){
      var q : any = data.questions[i];
      var questionGroup : FormGroup = <FormGroup>(<FormArray>this.gameForm.get('questions')).at(i);
      let answersArray : FormArray = (<FormArray>questionGroup.get('answers'));

      console.log(q);
      if (q.type === 'multiple_choice'){
        for (let j = 0; j < q.answers.length; j++){
          answersArray.push(this.formBuilder.group({
            answer: [q.answers[j].answer, Validators.required],
            isCorrect: [q.answers[j].isCorrect, Validators.required],
          }));
        }
      }else{

        for (let j = 0; j < q.answers.length; j++){
          answersArray.push(this.formBuilder.group({
            name: [q.answers[j].name],
            isBlank: [q.answers[j].isBlank],
            color : [q.answers[j].color]
          }));
        }

      }

    }
  }

  resetForm(){
    this.gameForm = this.formBuilder.group({
        name: [null, Validators.required],
        description: [null, Validators.required],
        isPublic: [false, Validators.required],
        questions: this.formBuilder.array([

        ])

    });
  }


}
