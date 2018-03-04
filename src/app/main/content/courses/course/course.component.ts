import { Component, OnInit, NgZone } from '@angular/core';
import {I18nSelectPipe} from '@angular/common'
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { fuseAnimations } from '../../../../core/animations';
import {MatSnackBar} from '@angular/material';
import { Observable } from 'rxjs/Observable';

//routing
import { ActivatedRoute, Router } from '@angular/router';

//firestore
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';



import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

enum ComponentState {IsEditing, IsCreating}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  animations   : fuseAnimations,
  providers: [
  // {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}
    ]
})
export class CourseComponent implements OnInit {

  categories: Observable<any[]>;
  isLinear = false;

  public ComponentState = ComponentState;
  public currentState : ComponentState = ComponentState.IsCreating;

//This references the whole collection
  courseCollectionFB:  AngularFirestoreCollection<any> = this.db.collection('courses');

//This references the document itself
  currentCourseFB : AngularFirestoreDocument<any>;

  //Couse variables
  courseID : string;


  model = {
    author:"",
    category: "",
    description: "",
    difficulty: 1,
    name: "",
    price: "",
    rating: {
      negative: 0,
      positive: 0
    },
    timeEstimate: {
      scale : "",
      time: 0
    },
    usersThatRated: {
      
    }

  };


  //Course definition variables

    category: string;


  constructor(
              private translationLoader: FuseTranslationLoaderService,
              private _formBuilder: FormBuilder,
              private db: AngularFirestore,
              private route: ActivatedRoute,
              private router: Router,
              public snackBar: MatSnackBar) {

    this.translationLoader.loadTranslations(english, spanish);

    this.categories = this.db.collection('categories').valueChanges();

  }
    ngOnInit() {


     if ((this.router.url).indexOf('course/edit') !== -1){
          this.currentState = ComponentState.IsEditing;

          this.route.params.subscribe(params => {
              this.courseID = params["course_id"]
              this.currentCourseFB = this.db.collection('courses').doc(this.courseID);
              const doc: Observable<any> = this.currentCourseFB.valueChanges();

              doc.subscribe(data => {
                this.dataToModel(data);
              })

           });
      }else{
        this.currentState = ComponentState.IsCreating;
      }

    }

    dataToModel(data: any){
      this.model = data;
    }


    setCategory(category: string){
      this.model.category = category;
    }


    onSubmit(){
      if (this.currentState == ComponentState.IsCreating){
        let data = this.model;
          this.courseCollectionFB.add(data);
          this.snackBar.open("¡Se ha creado el juego con éxito!",'',{
            duration: 2000,
            verticalPosition:'top'
          });
      }else{
        if(this.currentState == ComponentState.IsEditing){

            let data = this.model;
            this.courseCollectionFB.doc(this.courseID).set(data);
            this.snackBar.open("¡Se ha editado exitosamente el juego con éxito!",'',{
              duration: 2000,
              verticalPosition:'top'
            });

        }
      }
    }





}
