import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGameComponentComponent } from './view-game-component.component';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { RateGameComponent } from '../../rate/rate-game/rate-game.component';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';
import { AuthService } from '../../../../auth/auth.service';
import { PlatformLocation } from '@angular/common';
import { GameData } from '../models/gameData';

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


describe('ViewGameComponentComponent', () => {
  let component: ViewGameComponentComponent;
  let fixture: ComponentFixture<ViewGameComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGameComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGameComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
