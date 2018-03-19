import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../core/animations';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


@Component({
  selector: 'app-choose-categories',
  animations: fuseAnimations,
  templateUrl: './choose-categories.component.html',
  styleUrls: ['./choose-categories.component.scss']
})
export class ChooseCategoriesComponent implements OnInit {
    
  categories: Observable<any[]>;
  
  // This references the whole collection
     category: string;
     userUID:string;
     //userUID: Observable<string>;
     chosen : Array<any> = [];
     hightlightStatus: Array<boolean> = [];
    
  constructor(private translationLoader: FuseTranslationLoaderService,
              private db: AngularFirestore,
              private route: ActivatedRoute,
              private router: Router,
              public auth: AuthService) {
    //this.translationLoader.loadTranslations(english, spanish);
              
    //this.categories = this.db.collection('categories').valueChanges()
       
     this.categories = this.db.collection('categories').snapshotChanges().map(col => {       
    return col.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
    });
  });
  
  this.categories.subscribe();
    this.auth.user.subscribe(userData => {
      this.userUID = userData.uid;
      console.log(userData.uid)
      
      this.db.collection('users').doc(userData.uid).snapshotChanges()
          .map(documentData => {
            const data = documentData.payload.data();
            const id = documentData.payload.id;
            
            this.chosen = documentData.payload.get("interests");
            return { id, ...data };
          });
    });
    
  
  }

  ngOnInit() {
  }
  
  markCategory(ind, id){
      //console.log(this.userUID)
      
      if(!this.hightlightStatus[ind]){
          this.chosen.push(id)
      }
      else{
          let index = this.chosen.indexOf(id);
          this.chosen.splice(index,1)
      }
      
      this.hightlightStatus[ind] = !this.hightlightStatus[ind]
      console.log(id)
      console.log(ind)
  }
  
  goNext(){
      const userRef: AngularFirestoreDocument<any> = this.db.collection('users').doc(this.userUID);
      console.log(this.chosen)
      //clean undefined 
      this.chosen = this.chosen.filter(x => x)
      
      console.log(this.chosen)
      const data = {
          'myCategories': this.chosen
      };
      
      userRef.set(data, { merge: true });
      
  }
  

}
