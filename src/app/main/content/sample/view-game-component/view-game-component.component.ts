import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

/*
export interface GameData{
  activityName: string;
  description: string;
  isPublic: boolean;
  questions: Questions[];
}

export interface Questions{
  question: string;
  answers: Answers[];
}

export interface  Answers{
  answer: string;
  isCorrect: boolean;
}
*/

@Component({
  selector: 'app-view-game-component',
  templateUrl: './view-game-component.component.html',
  styleUrls: ['./view-game-component.component.scss']
})

export class ViewGameComponentComponent implements OnInit {

  activityName: string = "Actividad 1 - Límite y Continuidad";

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder ) {

  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

}
