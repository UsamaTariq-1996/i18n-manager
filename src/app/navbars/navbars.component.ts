import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TreeService } from '../services/tree.service';
@Component({
  selector: 'app-navbars',
  templateUrl: './navbars.component.html',
  styleUrls: ['./navbars.component.scss']
})

export class NavbarsComponent implements OnInit {
  todoCollectionRef: AngularFirestoreCollection<any>;
  todo$: Observable<any[]>;
  fileList: any[];
  imageDetailList: AngularFireList<any>;
  types = [
    {value: 'all', viewValue: 'All'},
    {value: 'some', viewValue: 'Some'},
    {value: 'none', viewValue: 'None'}
  ];
  downloadURL: Observable<any>;
  JsonArray: any;
  jsonurl: any;
  constructor(private router:Router , private afs : AngularFirestore , private storage : AngularFireStorage , private treeService : TreeService ) {
    // this.todoCollectionRef = this.afs.collection<any>('localization')
    // this.todo$ = this.todoCollectionRef.valueChanges();
    // console.log("localization" , this.todoCollectionRef);
    this.downloadURL = this.storage.ref('/localization/en.json').getDownloadURL();
   this.downloadURL.subscribe(res=>{
      console.log(res , "myDATATAT");
      
    });
   

    
    
   }

  ngOnInit(): void {
     this.getUrlData()
  }
  logout(){
    this.router.navigateByUrl('');
  }
    

     getUrlData()
    {
    
         this.treeService.geturl();

          // setTimeout(() => {
          //   this.treeService.getData().subscribe(res =>
          //     {
          //       console.log(res , "garam amasal");
                
          //     })
          // }, 6000);
     
        
    
    }
  
 

}
