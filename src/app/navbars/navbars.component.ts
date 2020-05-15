import { Component, OnInit, Injectable } from "@angular/core";
import { Router, NoPreloading } from "@angular/router";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "angularfire2/firestore";
import { Observable, BehaviorSubject, merge } from "rxjs";
import { AngularFireList } from "angularfire2/database";
import { AngularFireStorage } from "angularfire2/storage";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TreeService } from "../services/tree.service";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { NestedTreeControl } from "@angular/cdk/tree";
import { ArrayType } from "@angular/compiler";
import * as _ from 'lodash';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { deepEqual } from 'assert';
import * as deepmerge from 'deepmerge';
import { map, retry } from 'rxjs/operators';
import { LanguagesService, GoogleObj } from '../services/languages.service';


export class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
}

var TREE_DATA: string;


@Injectable()
export class FileDatabase {
  dataChange = new BehaviorSubject<FileNode[]>([]);
  cross : any[] = [];

  get data(): FileNode[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Parse the string to json object.
    setTimeout(() => {
      const dataObject = JSON.parse(TREE_DATA);

      
      
      // for(var i = 0 ; i < dataObject.length ; i++)
      // {
      //   var lengths =  Object.assign({}, ...function _flatten(o) { return [].concat(...Object.keys(o).map(k => typeof o[k] === 'object' ? _flatten(o[k]) : ({[k]: o[k]})))}(dataObject[i]))
      //    this.cross.push(Object.keys(lengths).length)
        
      //   if(this.cross[i-1] != null)
        
        
      //   {
      //   if(this.cross[i] < this.cross[i-1])
      //   {
          
      //       var obj = dataObject[i-1]
      //   }
      //   else{
      //     console.log("else oste");
          
      //     obj = dataObject[i]
      //   }
      // }
          
      
      // }

//      console.log(obj , "SORTED ");
          
  

      // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
      //     file node as children.
      const data = this.buildFileTree(dataObject, 0);

      // Notify the change.
      this.dataChange.next(data);
    }, 4000);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  buildFileTree(obj: object, level: number): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new FileNode();
      node.filename = key;
      

      if (value != null) {
        if (typeof value === "object") {
         
            console.log(key , "+1");
            
          
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.type = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}

@Component({
  selector: "app-navbars",
  templateUrl: "./navbars.component.html",
  styleUrls: ["./navbars.component.scss"],
  providers: [FileDatabase],
})
export class NavbarsComponent implements OnInit {
  todoCollectionRef: AngularFirestoreCollection<any>;
  userCollectionRef: AngularFirestoreCollection<any>;
  todo$: Observable<any[]>;
  fileList: any[];
  showcontent: boolean = false;
  dynamicForm: FormGroup;
  submitted = false;
 
  public headers: any[] = [];
  colorControl = new FormControl('accent');
  imageDetailList: AngularFireList<any>;
  types = [
    { value: "all", viewValue: "All" },
    { value: "some", viewValue: "Some" },
    { value: "none", viewValue: "None" },
  ];
  count : number = 0;
  downloadURL: Observable<any>;
  JsonArray: any;
  jsonurl: any;
  temp: any[] = [];
  userTemp:any[] = [];
  nestsort : any[] = []
  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;
  data_tree: any[] = [];
  temp1: any[] = [];
  
  todo: Observable<{ id: string; }[]>;
  userTodo: Observable<{ id: string; }[]>;
  getnode : any;
<<<<<<< HEAD
  langArr: any;
=======
  upData: object;
>>>>>>> 4237c4e0c3b84c40327d0e1abe4a58d8e4c0b4e5
  constructor(
    database: FileDatabase,
    private router: Router,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private treeService: TreeService,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private langService : LanguagesService
    
  ) {
   
    this.count = 0;
    this.todoCollectionRef = this.afs.collection<any>("localization");
    console.log(this.todoCollectionRef , "mi amor");
    console.log(this.userCollectionRef , "user collection ref");
    this.todo$ = this.todoCollectionRef.valueChanges();
    this.todo = this.todoCollectionRef.snapshotChanges().pipe(map(actions =>
      actions.map(a =>{
        const id = a.payload.doc.id;
        return {id}
      })));

      console.log(this.todo);
     
        console.log(this.userTodo,"User todo");  
        if(authService.isLoggedIn){
          
          var userArr = localStorage.getItem('uid');
          console.log(userArr,"user uid check")
          var userCollectionRef = this.afs.collection<any>('users').doc(userArr);

          userCollectionRef.get().subscribe(function(doc) {
            if (doc.exists) {
                 this.langArr = doc.data();
                console.log("Document data:", this.langArr);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
      }
     
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    database.dataChange.subscribe(
      (data) => (this.nestedDataSource.data = data)
    );
    
    this.todo.subscribe((res) =>{
      res.forEach(element => {
        this.temp.push(element)
      });
      
    })
    
  
  
     
    this.todo$.subscribe((res) => {
      // res.forEach((element) => {
        
        
        this.data_tree =res;
        res.forEach(element => {
         
        });

        var te = deepmerge.all(this.data_tree);
        
       this.upData = te; 
      // }); 

      

       //The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.
        
      
      TREE_DATA = JSON.stringify(te);
      console.log(TREE_DATA , "new log");
      
      
    });
  }
  
  
  ngOnInit(): void {
    //  this.getUrlData()
    this.dynamicForm = this.formBuilder.group({
      tickets: new FormArray([])
  });
  }
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.tickets as FormArray; }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }
  login(){
    this.router.navigateByUrl('/login')
  }

  itemClick(node) {
    console.log(node , "events");
    console.log(localStorage.getItem('user') , "main");
    
    this.nestsort = [];
    console.log(node.type, "game on ha");
    this.showcontent = true;
    this.t.clear()
      var i = 0
      var aisa = node.filename
      this.getnode = node.filename;
      console.log(this.t.value, "asdasd");
      
      
    
    
         for (let i = 0 ; i < this.data_tree.length; i++) {
             this.nestsort.push(Object.assign({}, ...function _flatten(o) { return [].concat(...Object.keys(o).map(k => typeof o[k] === 'object' ? _flatten(o[k]) : ({[k]: o[k]})))}(this.data_tree[i])))
       
                       
                     this.t.push(this.formBuilder.group({
                     name: [this.nestsort[i][aisa]]  
             }));
             /* console.log(this.t.value,"hhadjakdaslda"); */
             this.temp1 = this.t.value;
             console.log(this.nestsort[i][aisa],"temp111");
             
         }
  
        
    } 

    onSubmit(event)
    {
      var nesteds = null ;
     console.log(event , 'submitvalues');
     this.temp1 = event.tickets
    //  var i = 0;
      
      var str = this.temp1[0].name;
      console.log(this.upData , "main");
   //nesteds =  this.findPath(str , this.upData);
   for(let j = 0 ; j < this.temp1.length ; j++)
   {
    if(this.temp1[j] != null  && nesteds == null )
    {
      nesteds = this.findPath(this.temp1[j].name , this.upData)
    }

   }
    console.log(nesteds   , "finder");
    
      for(let i = 0 ; i < this.data_tree.length ; i++)
      {
        
        if(nesteds != "" || nesteds != null)
        {
          if(nesteds.length == 1)
          {
            var updateRef = this.todoCollectionRef.doc(this.temp[i].id).update({
              [this.getnode] :  this.temp1[i].name 
              })
          }
          else if (nesteds.length == 2)
          {
            var updateRef = this.todoCollectionRef.doc(this.temp[i].id).update({
              [`${nesteds[0]}.${nesteds[1]}`] :  this.temp1[i].name 
              })
          }
          else if (nesteds.length == 3)
          {
            var updateRef = this.todoCollectionRef.doc(this.temp[i].id).update({
              [`${nesteds[0]}.${nesteds[1]}.${nesteds[2]}`] :  this.temp1[i].name 
              })
          }
          else if (nesteds.length == 4)
          {
            var updateRef = this.todoCollectionRef.doc(this.temp[i].id).update({
              [`${nesteds[0]}.${nesteds[1]}.${nesteds[2]}.${nesteds[3]}`] :  this.temp1[i].name 
              })
          } 
          
        }
        else{

      console.log("multiple errors");
      
    }
       }
    }

     findPath(a, obj) {
      function iter(o, p) {
          return Object.keys(o).some(function (k) {
              result = p.concat(Array.isArray(o) ? +k : k);
              return o[k] === a || o[k] && typeof o[k] === 'object' && iter(o[k], result);
          });
      }
      var result;
      return iter(obj, []) && result || undefined;
  }


   
        
    myname(event)
    {
      //console.log(event , this.temp1[event2].name , "lnag");
     // var sourcelang = this.temp[event2].id;
      var targetlang = this.temp[event].id;
      
      //var sourceex = /[^-]*$/g;
      var targetex = /[^-]*$/g;
      //var sourceresult = sourceex.exec(sourcelang);
      var targetresult = targetex.exec(targetlang);
      console.log(targetresult , "maro");
      
    
     // console.log(ex , "asdasd");
      
      const googleObj: GoogleObj = {
        q: this.temp1[0].name,
        target: targetresult[0] ,
        source: 'en' , 
        };
      this.langService.translate(googleObj).subscribe(res => {
        console.log(res);
         
      var str = res.data.translations[0].translatedText;
      this.t.at(event).get('name').patchValue(str)
      this.temp1 = [];
      this.temp1 = this.t.value;
      console.log(this.temp1 , "temper");
      
          })


          


    }
        
  
    
  
 
  //  getUrlData()
  // {

  //      this.treeService.geturl();

  //       setTimeout(() => {
  //         this.treeService.getData().subscribe(res =>
  //           {
  //             console.log(res , "garam amasal");
  //              TREE_DATA = JSON.stringify(res);

  //           })
  //       }, 5000);

  // }

  hasNestedChild = (_: number, nodeData: FileNode) => !nodeData.type;

  private _getChildren = (node: FileNode) => node.children;
}