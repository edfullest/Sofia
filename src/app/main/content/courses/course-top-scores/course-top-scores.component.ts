import { Component, OnInit, ViewChild } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { locale as english } from '../i18n/en';
import { locale as spanish } from '../i18n/es';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../../auth/auth.service';
import {MatTable, MatPaginator, MatTableDataSource} from '@angular/material';
import { DataSource } from "@angular/cdk/collections";

@Component({
  selector: 'app-course-top-scores',
  templateUrl: './course-top-scores.component.html',
  styleUrls: ['./course-top-scores.component.scss']
})
export class CourseTopScoresComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
   
  gameScores:Observable<any>;
  
  gameScoresArray:Observable<any>;
  cumulativesCollectionRef:Observable<any>;
  displayedColumns= ['position','userName', 'userGamesCompleted','userScore']; //position
  courseID: string;
  subArray:any[];
  offset:number = 0;
  course:Object;
  
  //courseName:string;
  //gameName:string;
  
  numOfGames:number;
  courseName:Promise<string>;
  dataSource:MatTableDataSource<any>;
  numGamesSt:string ='';
  
  constructor(public translationLoader: FuseTranslationLoaderService, public db: AngularFirestore, 
                public router: Router,
                public route : ActivatedRoute,
                public auth : AuthService) {
                
                    this.route.params.subscribe(params => {
          this.courseID = params["course_id"]
          this.loadCourse()
          
           db.collection('courses').doc(this.courseID).collection('games').ref.get().then((querySnapshot) =>{      
          this.numOfGames= querySnapshot.size;
          this.numGamesSt = '/' + this.numOfGames.toString()
          console.log(querySnapshot.size);
           }).catch();
       });
    }

  ngOnInit() {
      //this.gameScores= this.db.collection('courses/' + this.courseID + '/games/' + this.gameID + '/submissions', ref => ref.orderBy('score')).valueChanges()
      //this.gameScores.subscribe()
      
      this.cumulativesCollectionRef = this.db.collection<any>('courses/' + this.courseID + '/cumulatives', ref => ref.orderBy('totalScore','desc'))
          .snapshotChanges().map(document => {
          return document.map(documentData => {
            console.log(documentData)
            const data = documentData.payload.doc.data();
            const id = documentData.payload.doc.id;
            return { id, ...data };
          });
       });
      
      //this.gameScoresArray = this.subCollectionRef
      /*
      this.gameScoresArray = this.db.collection('courses').doc(this.courseID).collection('games').doc(this.gameID).collection('submissions')
      .snapshotChanges().map(document => {
          return document.map(documentData => {
            console.log(documentData)
            const data = documentData.payload.doc.data();
            const id = documentData.payload.doc.id;
            return { id, ...data };
          });
       });*/
       
      this.cumulativesCollectionRef.subscribe(data => {
      //this.gameScoresArray.subscribe(data => {
          this.subArray = data
          this.dataSource = new MatTableDataSource<any>(this.subArray)
          this.dataSource.paginator = this.paginator;
          
          console.log(this.subArray)
      });
      
       /*
      this.db.collection('courses').doc(this.courseID).collection('games').doc(this.gameID).collection('submissions').ref.orderBy('score').onSnapshot((snapshot) => {
          
          
          });
          
          **/
          
}

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }
  
  onPaginateChange(event){
     this.offset = (event.pageIndex * event.pageSize)
     console.log(this.offset)
    //console.log(JSON.stringify("Current page index: " + event.pageIndex));
  }
  
  loadCourse(){
      this.courseName = this.db.doc('courses/' + this.courseID).ref.get().then(doc =>{
        if (doc.exists) {
        console.log('fml')
        //this.courseName = doc.get('name');
        this.course = doc.data();
        return doc.get('name')
    }});     
  }

}
