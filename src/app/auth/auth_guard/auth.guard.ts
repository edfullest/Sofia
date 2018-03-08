import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../auth.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from 'angularfire2/firestore';
import {PlatformLocation } from '@angular/common';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

      return this.auth.user
              .take(1)
              .map(user => !!user)
              .do(loggedIn => {
                if ( !loggedIn ){
                  this.router.navigate(['/login']);
                }
              });

  }
}

@Injectable()
export class StudentGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

      return this.auth.user
              .take(1)
              .map(user => {
                if (!user.roles['student']){
                  this.router.navigate(['/teacher/courses']);
                }
                return user.roles['student']
                
              })
  }
}

@Injectable()
export class ProfessorGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

      return this.auth.user
              .take(1)
              .map(user => {
                if (!user.roles['professor']){
                  this.router.navigate(['/student/courses']);
                }
                return user.roles['professor']
                
              })
  }
}

@Injectable()
export class CanUpdateCourseGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private route : ActivatedRoute, private db: AngularFirestore, private platformLocation: PlatformLocation){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

      return this.auth.user
              .take(1)
              .switchMap(user => {
                // Si no es profesor, entonces hacemos redirect
                if (!user.roles['professor']){
                  // Lo dejamos en el mismo lugar donde está
                  this.router.navigate([(this.platformLocation as any).location.pathname + "/reload"], {skipLocationChange: true  });
                  return Observable.of(false)
                }
                // Checamos que el creador del curso sea el mismo que quiera entrar a editarlo
                const document = this.db.collection('courses').doc(next.params['course_id'])
                let observable = document.snapshotChanges().map(docData => {

                  const data = docData.payload.data();
                  if (user.uid != data.createdBy){
                      this.router.navigate([(this.platformLocation as any).location.pathname + "/reload"]);
                  }
                  return user.uid == data.createdBy
                });
        
                return observable      
              })
  }
}

@Injectable()
export class CanViewGame implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private route : ActivatedRoute, private db: AngularFirestore, private platformLocation: PlatformLocation){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

      return this.auth.user
              .take(1)
              .switchMap(user => {
               
                // Checamos que el creador del curso sea el mismo que quiera entrar a editarlo
             
                const game = this.db.collection('courses').doc(next.params['course_id']).collection('games').doc(next.params['game_id'])
                const course = this.db.collection('courses').doc(next.params['course_id'])
                console.log(course)
                let isCourseCreator$ : Observable<boolean> = course.snapshotChanges().map(docData => {

                  const data = docData.payload.data();
                  console.log(data)
                  console.log(user)
                  if (user != undefined){
                    return user.uid == data.createdBy
                  }
                  return false
                  
                });

                let isGamePublic$ : Observable<boolean> = game.snapshotChanges().map(docData => {

                  const data = docData.payload.data();
                  if (!data.isPublic){
                    console.log("Game is not public")
                  }
                  return data.isPublic
                });
        
                return combineLatest(
                  isCourseCreator$,
                  isGamePublic$,
                  (isCourseCreator,isGamePublic) => (isCourseCreator || isGamePublic))     
              })
  }
}

// @Injectable()
// export class CanCreateCourseGuard implements CanActivate {

//   constructor(private auth: AuthService, private router: Router, private route : ActivatedRoute, private db: AngularFirestore, private platformLocation: PlatformLocation){}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | boolean {

//       return this.auth.user
//               .take(1)
//               .map(user => {
//                 // Si no es profesor, entonces hacemos redirect
//                 return user.roles['professor']
                     
//               })
//   }
// }


