import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { Component, OnInit, NgZone } from '@angular/core';
import { I18nSelectPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

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


describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
