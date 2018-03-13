import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { AngularFirestore} from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute, Router } from "@angular/router";
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})

export class UserprofileComponent implements OnInit {
  
  myUser: Observable<any>;
  settingsForm: FormGroup;
  userId:string;
  profilePicURL:string;
  task: AngularFireUploadTask;
  isEdit:boolean;
  about:string;
  
  settingsForm: FormGroup;
  
   // Progress monitoring
  snapshot: Observable<any>;
  // Download URL
  downloadURL: Observable<string>;
  url:string;
  
  constructor(private translationLoader: FuseTranslationLoaderService, 
                private db: AngularFirestore, 
                public auth : AuthService,
                private route : ActivatedRoute,
                private formBuilder: FormBuilder, 
                private storage: AngularFireStorage) {
                
       this.isEdit = false;
  }

  ngOnInit(){
      this.route.params.subscribe(params => {
          this.userId = params["user_id"]
          this.loadUser()
          this.myUser.subscribe()
       });
       
      // console.log(this.myUser)
      
           this.settingsForm = this.formBuilder.group({
            about: ['', []]
            /*email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]*/
        });
        
        
        
  }
  
  loadUser(){
     //this.db.collection('users').doc(this.userId).ref.get()
      
      this.myUser = this.db.collection('users').doc(this.userId).snapshotChanges()
          .map(documentData => {
              const data = documentData.payload.data();
            const id = documentData.payload.id;
            this.profilePicURL = documentData.payload.get("photoURL");
            this.about = documentData.payload.get("bio");
            //console.log(data)
            return { id, ...data };
          });
      
      
  }
  
  uploadPicture(event:FileList){
      const file = event.item(0)
      
    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `users/profilepic/${new Date().getTime()}_${file.name}`;
    const customMetadata = { app: 'My AngularFire-powered PWA!' };
    this.task = this.storage.upload(path, file, { customMetadata })
    this.downloadURL = this.task.downloadURL();
    this.downloadURL.subscribe(u => {this.url=u})
    
    this.task.then(result => {
        let url = this.storage.ref(path).getDownloadURL()
        url.subscribe(u => {{this.db.collection('users').doc(this.userId).set({"photoURL": u}, { merge: true })}})
        //this.db.collection('users').doc(this.userId).set({"photoURL":urlx}, { merge: true })
        
    });
     
    /*
    // Progress monitoring
    this.snapshot = this.task.snapshotChanges().pipe(
        tap(snap => {
      if (snap.bytesTransferred === snap.totalBytes) {
        // Update firestore on completion
          console.log(this.downloadURL)
          console.log(this.url)
        this.db.collection('users').doc(this.userId).set({"photoURL":this.url}, { merge: true })
      }
    })
    )
    
    this.snapshot.subscribe()
    */
    
    //console.log(this.storage.ref(path).getDownloadURL().subscribe())
    
    // The file's download URL
    //this.downloadURL = this.task.downloadURL();
    //let url = this.downloadURL.subscribe();
    
  }
  
  editAbout(){
      
      if(this.isEdit){
      const userRef: AngularFirestoreDocument<any> = this.db.collection('users').doc(this.userId);
      //console.log(this.settingsForm.value['about']);
      
      const data = {
          'bio': this.settingsForm.value['about'];
      };
      
      userRef.set(data, { merge: true });
      }
      
      this.isEdit = !this.isEdit;
  }
  
  

}
