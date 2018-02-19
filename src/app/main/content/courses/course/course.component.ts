import { Component, OnInit, NgZone } from '@angular/core';
import {I18nSelectPipe} from '@angular/common'
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
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  gameID: string;
  category: string;
  courseForm: FormGroup;
  public ComponentState = ComponentState;
  public currentState : ComponentState = ComponentState.IsCreating;

  coursesFB : AngularFirestoreCollection<any> = this.db.collection('courses');

  constructor(private fb: FormBuilder,
              private db: AngularFirestore,
              public snackBar: MatSnackBar,
              private translationLoader: FuseTranslationLoaderService,
              private route: ActivatedRoute,
              private router: Router,
              private ngZone:NgZone) {
    this.translationLoader.loadTranslations(english, spanish);
  }

  ngOnInit() {
    this.category = "";
  }

  setCategory(value: string){
    this.category = value;
  }

  onSubmit() {
    if (this.courseForm.valid){
      // The actions for onSubmit vary depending on what the user is doing
      if (this.currentState == ComponentState.IsCreating){
        let data = this.courseForm.value;
          this.coursesFB.add({
            name : data.courseName,
            description : data.description,
            difficulty : data.group.value,
            category : this.category,
            author : "Test Author"
            price: data.price,
          })
          this.snackBar.open("¡Se ha creado el curso con éxito!",'',{
            duration: 2000,
            verticalPosition:'top'
          })
      }
      // else{
      //   let data = this.courseForm.value;
      //   this.courseForm.doc(this.gameID).set({
      //     name : data.name,
      //     description : data.description,
      //     isPublic : data.isPublic,
      //     questions : data.questions,
      //   })
      //   this.snackBar.open("¡Se ha editado exitosamente el juego con éxito!",'',{
      //     duration: 2000,
      //     verticalPosition:'top'
      //   })
      // }
      this.resetForm();
    }
  }

}
