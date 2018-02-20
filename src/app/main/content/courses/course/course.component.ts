import { Component, OnInit, NgZone } from '@angular/core';
import {I18nSelectPipe} from '@angular/common'
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { OnInit } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';

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
],
})
export class CourseComponent implements OnInit {

  categories: Observable<any[]>;
  isLinear = false;

  public ComponentState = ComponentState;
  public currentState : ComponentState = ComponentState.IsCreating;

  currentCourseFB : AngularFirestoreDocument<any>;

  //Couse variables
  courseID : String;


  model = {
    author:"New Course",
    category: "",
    description: "This is a description",
    difficulty: 1,
    name: "This is a test name",
    price: "9000000000",
    rating: {
      negative: 0,
      positive: 0
    },
    timeEstimate: {
      scale : "meses",
      time: 0
    }

  };


  //Course definition variables

    category: String;


  constructor(
              private translationLoader: FuseTranslationLoaderService,
              private _formBuilder: FormBuilder,
              private db: AngularFirestore,
              private route: ActivatedRoute,
              private router: Router) {

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

      console.log("This is the data I've got");
      console.log(data);

    }


    setCategory(category: String){
      this.model.category = category;
    }





}
