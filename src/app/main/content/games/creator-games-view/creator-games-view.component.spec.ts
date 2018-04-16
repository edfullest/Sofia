import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatorGamesViewComponent } from './creator-games-view.component';
import { Component, OnInit } from '@angular/core';
import { GamesViewComponent } from '../games-view.component';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '../../../../core/animations';
import { AuthService } from '../../../../auth/auth.service';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';


const environment = {
  production: false,
  hmr: false,
  firebase: {
    apiKey: 'AIzaSyDRejLleE6Z1B8y9vt-RKJpC3MpOXp7n6M',
    authDomain: 'sofia-97b65.firebaseapp.com',
    databaseURL: 'https://sofia-97b65.firebaseio.com',
    projectId: 'sofia-97b65',
    storageBucket: 'sofia-97b65.appspot.com',
    messagingSenderId: '749913572579'
  }
};


describe('CreatorGamesViewComponent', () => {
  let component: CreatorGamesViewComponent;
  let fixture: ComponentFixture<CreatorGamesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatorGamesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorGamesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
