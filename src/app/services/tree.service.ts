import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FirebaseStorage } from 'angularfire2';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  todoCollectionRef: AngularFirestoreCollection<any>;
  todo$: Observable<any[]>;
 
   jsonUrl : string
  url: string;
  constructor( private db : AngularFirestore ,private http : HttpClient ) {
    this.todoCollectionRef = this.db.collection<any>('localization');
    this.todo$ = this.todoCollectionRef.valueChanges();
   
    this.todo$.subscribe(res=>
      {
        res.forEach(element => {
          this.jsonUrl = element.url;
          console.log(this.jsonUrl , "ASdasdas");
          
        });
      })
   }

   geturl()
   {
     this.todo$.subscribe(res=>
      {
        res.forEach(element => {
          this.jsonUrl = element.url;
          console.log(this.jsonUrl , "ASdasdas");
      
        });
      })
   }
 
   getData():Observable<any> { 
 console.log(this.jsonUrl, "Data");   
   return  this.http.get(this.jsonUrl)
  
  
 
   
  }
   
}
