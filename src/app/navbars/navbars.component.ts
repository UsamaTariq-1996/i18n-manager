import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TreeService } from '../services/tree.service';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

export class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
}

var TREE_DATA: string ;
@Injectable()
export class FileDatabase {
  dataChange = new BehaviorSubject<FileNode[]>([]);

  get data(): FileNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Parse the string to json object.
   setTimeout(() => {
     
    
    const dataObject = JSON.parse(TREE_DATA);
    
    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
    //     file node as children.
    const data = this.buildFileTree(dataObject, 0);

    // Notify the change.
    this.dataChange.next(data);
  }, 8000);
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
        if (typeof value === 'object') {
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
  selector: 'app-navbars',
  templateUrl: './navbars.component.html',
  styleUrls: ['./navbars.component.scss'],
  providers: [FileDatabase]
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
  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;
  constructor(database: FileDatabase , private router:Router , private afs : AngularFirestore , private storage : AngularFireStorage , private treeService : TreeService ) {
    // this.todoCollectionRef = this.afs.collection<any>('localization')
    // this.todo$ = this.todoCollectionRef.valueChanges();
    // console.log("localization" , this.todoCollectionRef);
    this.downloadURL = this.storage.ref('/localization/en.json').getDownloadURL();
   
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    database.dataChange.subscribe(data => this.nestedDataSource.data = data);
   

    
    
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

          setTimeout(() => {
            this.treeService.getData().subscribe(res =>
              {
                console.log(res , "garam amasal");
                 TREE_DATA = JSON.stringify(res);
               
                
              })
          }, 5000);
     
        

    
    }
    
  
    hasNestedChild = (_: number, nodeData: FileNode) => !nodeData.type;
  
    private _getChildren = (node: FileNode) => node.children;
 

}
