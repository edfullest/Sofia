import { Component, OnInit, NgZone } from '@angular/core';
import {I18nSelectPipe} from '@angular/common' ;
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { fuseAnimations } from '../../../../core/animations';
import {MatSnackBar} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../../auth/auth.service';

import { UploadService } from './shared/upload.service';
import { Upload } from './shared/upload';
import * as _ from 'lodash';


// routing
import { ActivatedRoute, Router } from '@angular/router';

// firestore
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';



import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

enum ComponentState {IsEditing, IsCreating}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  animations   : fuseAnimations,
  providers: [
    UploadService
    ]
})
export class CourseComponent implements OnInit {

  categories: Observable<any[]>;
  isLinear = false;

  public ComponentState = ComponentState;
  public currentState: ComponentState = ComponentState.IsCreating;

// Parameters used to upload files
  selectedFiles: FileList;
  currentUpload: Upload;
  hasBeenUploaded = false;


// This references the whole collection
  courseCollectionFB:  AngularFirestoreCollection<any> = this.db.collection('courses');

// This references the document itself
  currentCourseFB: AngularFirestoreDocument<any>;

  // Couse variables
  courseID: string;
  userUID: string;
  author: string;


  model = {
    author: '',
    category: '',
    description: '',
    difficulty: 1,
    name: '',
    price: '',
    rating: {
      negative: 0,
      positive: 0
    },
    timeEstimate: {
      scale : '',
      time: 0
    },
    usersThatRated: {
      
    },
    students: {

    },
    createdBy: '',
    imageData: {
        url: '',
        name: ''
    },
    categoryID : '',

  };


  // Course definition variables

  category: any;


  constructor(
              private translationLoader: FuseTranslationLoaderService,
              private _formBuilder: FormBuilder,
              private db: AngularFirestore,
              private route: ActivatedRoute,
              private router: Router,
              private upSvc: UploadService,
              public snackBar: MatSnackBar,
              public auth: AuthService) {

    this.translationLoader.loadTranslations(english, spanish);

    this.categories = this.db.collection('categories').snapshotChanges().map(document => {
        return document.map(documentData => {
          const data = documentData.payload.doc.data();
          const id = documentData.payload.doc.id;
          return { id, ...data };
        });
     });
    this.auth.user.subscribe(userData => {
      this.userUID = userData.uid;
      this.author = userData.displayName;
    });

  }
    ngOnInit() {


     if ((this.router.url).indexOf('course/edit') !== -1){
          this.currentState = ComponentState.IsEditing;

          this.route.params.subscribe(params => {
              this.courseID = params['course_id'];
              this.currentCourseFB = this.db.collection('courses').doc(this.courseID);
              const doc: Observable<any> = this.currentCourseFB.valueChanges();

              doc.subscribe(data => {
                this.dataToModel(data);
              });

           });
      }else{
        this.currentState = ComponentState.IsCreating;
      }
    }

    dataToModel(data: any){
      this.model = data;
    }


    setCategory(category){
      this.model.category = category.name;
      this.model.categoryID = category.id;
    }


    onSubmit(){
      if (this.currentState === ComponentState.IsCreating){
        this.model.createdBy = this.userUID;
        this.model.author = this.author;

        if (this.hasBeenUploaded){
          this.model.imageData.name = this.currentUpload.name;
          this.model.imageData.url = this.currentUpload.url;
        }else{
          this.model.imageData.name = 'default_course.jpg';
          // tslint:disable-next-line:max-line-length
          this.model.imageData.url = 'https://firebasestorage.googleapis.com/v0/b/sofia-97b65.appspot.com/o/uploads%2Fdefault_course.jpg?alt=media&token=d0a392b9-0198-41d1-b889-474a94d2e433';
        }


        const data = this.model;

          this.courseCollectionFB.add(data);
          this.snackBar.open('¡Se ha creado el juego con éxito!', '', {
            duration: 2000,
            verticalPosition: 'top'
          });
      }else{
        if (this.currentState === ComponentState.IsEditing){

          if (this.hasBeenUploaded){
            this.model.imageData.name = this.currentUpload.name;
            this.model.imageData.url = this.currentUpload.url;
          }


            console.log(this.model);

            let data = this.model;
            this.courseCollectionFB.doc(this.courseID).set(data);
            this.snackBar.open('¡Se ha editado exitosamente el juego con éxito!', '', {
              duration: 2000,
              verticalPosition: 'top'
            });

        }
      }
    }


  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload);
    this.hasBeenUploaded = true;

  }
  




}
