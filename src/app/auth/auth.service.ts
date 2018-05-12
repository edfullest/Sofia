import { Injectable } from '@angular/core';

import {Router} from '@angular/router';

import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';

import { User } from './user';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AuthService {

  user: Observable<User>;
  isLogged = false;

  emailUserModel = {
    email : '',
    password: '',
    name: '',
  };

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            this.isLogged = true;
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            this.isLogged = false;
            return Observable.of(null);
          }
        });
  }

    emailSignUp(registerForm: any) {
      this.emailUserModel.email = registerForm.value['email'];
      this.emailUserModel.password = registerForm.value['password'];
      this.emailUserModel.name = registerForm.value['name'];
      return this.afAuth.auth.createUserWithEmailAndPassword(this.emailUserModel.email, this.emailUserModel.password)
        .then((user) => {
            let auth = firebase.auth();
            auth.currentUser.sendEmailVerification();
            return this.updateUserEmailData(user); // if using firestore
        })
        .catch((error) => this.handleError(error) );
    }

    emailLogin(email: string, password: string) {
      this.isLogged = true;
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .catch((error) => this.handleError(error) );
    }

    // Sends email allowing user to reset password
    resetPassword(email: string) {
      const fbAuth = firebase.auth();

      return fbAuth.sendPasswordResetEmail(email)
        .catch((error) => this.handleError(error));
    }

    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.isLogged = true;
      return this.oAuthLogin(provider);
    }

    githubLogin() {
      const provider = new firebase.auth.GithubAuthProvider();
      this.isLogged = true;
      return this.oAuthLogin(provider);
    }

    twitterLogin() {
      const provider = new firebase.auth.TwitterAuthProvider();
      this.isLogged = true;
      return this.oAuthLogin(provider);
    }

    facebookLogin() {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.isLogged = true;
      provider.addScope('user_birthday');
      return this.oAuthLogin(provider);
    }



    private oAuthLogin(provider) {
      this.isLogged = true;
      return this.afAuth.auth.signInWithPopup(provider)
        .then((credential) => {
               this.router.navigate(["/student/home"])
               this.updateUserData(credential.user);
        });
    }

    private updateUserData(user) {
      // Sets user data to firestore on login

      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

      const data: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        roles: {
                'professor':true,
                'student':true
              },
        myCategories : ['']
      };

      return userRef.set(data, { merge: true });

    }


    private cleanModel(){
        this.emailUserModel = {
                    email : '',
                    password: '',
                    name: '',
                  };
    }


    private updateUserEmailData(user) {
      // Sets user data to firestore on login
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

      const data: User = {
        uid: user.uid,
        email: this.emailUserModel.email,
        displayName: this.emailUserModel.name,
        photoURL: 'https://lh3.googleusercontent.com/-QKdHUx-GyrI/AAAAAAAAAAI/AAAAAAAAAAA/mJb6NuzUtdo/photo.jpg',//user.photoURL,
        roles: {
                'professor':true,
                'student':true
              },
        myCategories : ['']
      };
      this.cleanModel();
      return userRef.set(data, { merge: true });

    }


    signOut(){
      this.afAuth.auth.signOut().then(data =>{
          this.router.navigate(["/login"])
          this.isLogged = false;
      });
    }

    // If error, console log and notify user
    private handleError(error: Error) {
      console.error(error);
      this.isLogged = false;
    }


    // Roles Authorization //

    // Rules
    canCreate(user: User): boolean {
      const allowedUsers = ['professor'];
      return this.checkAuth(user, allowedUsers);
    }

    canRead(user: User): boolean {
      const allowedUsers = ['professor', 'student'];
      return this.checkAuth(user, allowedUsers);
    }

    canUpdate(user: User): boolean {
      const allowedUsers = ['professor'];
      return this.checkAuth(user, allowedUsers);
    }

    canDelete(user: User): boolean {
      const allowedUsers = ['professor'];
      return this.checkAuth(user, allowedUsers);
    }

    // determines if user has matching role
    private checkAuth(user: User, allowedRules: string[]): boolean{
      if (!user){ return false; }
      for (const role of allowedRules){
        if (user.roles[role]){
          return true;
        }
      }
      return false;
    }


}
