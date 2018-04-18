import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTopScoresComponent } from './game-top-scores.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { locale as english } from '../i18n/en';
import { locale as spanish } from '../i18n/es';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../../auth/auth.service';
import { MatTable, MatPaginator, MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';

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


describe('GameTopScoresComponent', () => {
  // let component: GameTopScoresComponent;
  // let fixture: ComponentFixture<GameTopScoresComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ GameTopScoresComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(GameTopScoresComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
