import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-create-game-component',
  templateUrl: './create-game-component.component.html',
  styleUrls: ['./create-game-component.component.scss']
})
export class CreateGameComponentComponent implements OnInit {
  activityName : string = "";
  gameForm: FormGroup;
  answersForm: FormGroup;
  constructor(private fb: FormBuilder) { 

  }
  addQuestion(){
    (<FormArray>this.gameForm.get('questions')).push(this.fb.group({
          question: [null, Validators.required],
          answers : this.fb.array([
                this.fb.group({
                  answer: ['', Validators.required],
                  isCorrect: [false,Validators.required]
              })
          ])
          
        }));
  }

  deleteQuestion(selectedQuestionIndex){
    const control = <FormArray>this.gameForm.get('questions')
    // remove the chosen row
    control.removeAt(selectedQuestionIndex);
  }

  deleteAnswer(currentQuestionIndex, selectedAnswerIndex){
    var questionsArray : FormArray = <FormArray>this.gameForm.get('questions')
    var selectedQuestion : FormGroup = <FormGroup> questionsArray.controls[currentQuestionIndex]
    var answersArray = <FormArray> selectedQuestion.get('answers')
    answersArray.removeAt(selectedAnswerIndex)
  }

  addAnswer(selectedQuestionIndex){
    var questionsArray : FormArray = <FormArray>this.gameForm.get('questions')
    var selectedQuestion : FormGroup = <FormGroup> questionsArray.controls[selectedQuestionIndex]
    var answersArray = <FormArray> selectedQuestion.get('answers')
     answersArray.push(this.fb.group({
                  answer: ['', Validators.required],
                  isCorrect: [false,Validators.required]
              }))

  }

  ngOnInit() {
      this.gameForm = this.fb.group({
        name: [null, Validators.required],
        description: [null, Validators.required],
        isPublic: [false, Validators.required],
        questions: this.fb.array([
          
        ])

    });
  }

}
