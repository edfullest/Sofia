import { Injectable } from '@angular/core';

import {Router} from '@angular/router';

import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';

import { User } from './user';
import {Observable} from 'rxjs/Observable';


@Injectable()

export class EmailPasswordCredentials {
  email: string;
  password: string;


}

export class AuthService {

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return Observable.of(null);
          }
        });
  }

    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      return this.oAuthLogin(provider);
    }

    facebookLogin() {
      const provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope('user_birthday');
      return this.oAuthLogin(provider);
    }

    twitterLogin() {
      const provider = new firebase.auth.TwitterAuthProvider();
      return this.oAuthLogin(provider);
    }

    githubLogin() {
      const provider = new firebase.auth.GithubAuthProvider();
      return this.oAuthLogin(provider);
    }

    emailSignUp(email: string, password: string) {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
          return this.updateUserData(user); // if using firestore
        })
        .catch((error) => this.handleError(error) );
    }

    emailLogin(email: string, password: string) {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          return this.updateUserData(user); // if using firestore
        })
        .catch((error) => this.handleError(error) );
    }

    

    private oAuthLogin(provider) {
      return this.afAuth.auth.signInWithPopup(provider)
        .then((credential) => {
          this.updateUserData(credential.user);
        });
    }

      // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
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
          professor: true
        }
      };

      return userRef.set(data, { merge: true });

    }

    signOut(){
      this.afAuth.auth.signOut();
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
