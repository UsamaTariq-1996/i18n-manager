import { Injectable } from '@angular/core';


import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  userData: firebase.User;

  constructor(private firebaseAuth: AngularFireAuth ,  private afs: AngularFirestore,
    private router: Router) {
    this.user = firebaseAuth.authState.pipe(
      
      switchMap(user =>{
        console.log("userdata",this.user);
        if(user)
        {
        this.userData = user;
        
        
        JSON.parse(localStorage.getItem('user'));
          return this.afs.doc<firebase.User>(`users/${user.uid}`).valueChanges(); 
        }
        else
        {
          return of(null);
        }
      })
    );
   }

   get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.uid !== null) ? true : false;
  }

   async login(email : string , password : string)
   {
   await this.firebaseAuth
     .auth
     .signInWithEmailAndPassword(email , password)
     .then(value =>{
      localStorage.setItem('user', JSON.stringify(value));
       console.log("welcome User" , value.user.email , value.user.uid);
      this.updateUserData(value.user.email , value.user.uid)
     })
     .catch(err =>{
       console.log("something went wrong" , err.message);
       
     })
   }
   logout()
   {
     this.firebaseAuth.auth.signOut();
     localStorage.removeItem('user');
   }
   private updateUserData(email:string , uid) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = { 
      uid: uid, 
      email:email 
     
    } 

    return userRef.set(data, { merge: true })

  }
}
