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
  questionsForm: FormGroup;
  answersForm: FormGroup;
  constructor(private fb: FormBuilder) { 

  }
  addQuestion(){
    (<FormArray>this.questionsForm.get('questions')).push(this.fb.group({
          question: [null, Validators.required],
          answers : this.fb.array([
                this.fb.group({
                  description: ['', Validators.required],
                  is_correct: [false,Validators.required]
              })
          ])
          
        }));
  }

  deleteQuestion(selectedQuestionIndex){
    const control = <FormArray>this.questionsForm.get('questions')
    // remove the chosen row
    control.removeAt(selectedQuestionIndex);
  }

  deleteAnswer(currentQuestionIndex, selectedAnswerIndex){
    var questionsArray : FormArray = <FormArray>this.questionsForm.get('questions')
    var selectedQuestion : FormGroup = <FormGroup> questionsArray.controls[currentQuestionIndex]
    var answersArray = <FormArray> selectedQuestion.get('answers')
    answersArray.removeAt(selectedAnswerIndex)
  }

  addAnswer(selectedQuestionIndex){
    var questionsArray : FormArray = <FormArray>this.questionsForm.get('questions')
    var selectedQuestion : FormGroup = <FormGroup> questionsArray.controls[selectedQuestionIndex]
    var answersArray = <FormArray> selectedQuestion.get('answers')
     answersArray.push(this.fb.group({
                  description: ['', Validators.required],
                  is_correct: [false,Validators.required]
              }))

  }

  ngOnInit() {
      this.questionsForm = this.fb.group({
      questions: this.fb.array([
        
      ])
    });
  }

}
