import { Component, OnInit, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "angularfire2/firestore";
import { Observable, BehaviorSubject } from "rxjs";
import { AngularFireList } from "angularfire2/database";
import { AngularFireStorage } from "angularfire2/storage";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TreeService } from "../services/tree.service";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { NestedTreeControl } from "@angular/cdk/tree";
import { ArrayType } from "@angular/compiler";
import * as _ from 'lodash';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

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

  
      for(var i = 0 ; i < dataObject.length ; i++)
      {
        var lengths =  Object.assign({}, ...function _flatten(o) { return [].concat(...Object.keys(o).map(k => typeof o[k] === 'object' ? _flatten(o[k]) : ({[k]: o[k]})))}(dataObject[i]))
         this.cross.push(Object.keys(lengths).length)
        
        
        if(this.cross[i-1] != null)
        
        
        {
        if(this.cross[i] < this.cross[i-1])
        {
          
            var obj = dataObject[i-1]
        }
        else{
          console.log("else oste");
          
          obj = dataObject[i]
        }
      }
          
      
      }

      console.log(obj , "SORTED ");
          
  

      // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
      //     file node as children.
      const data = this.buildFileTree(obj, 0);

      // Notify the change.
      this.dataChange.next(data);
    }, 2000);
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
  todo$: Observable<any[]>;
  fileList: any[];
  showcontent: boolean = false;
  dynamicForm: FormGroup;
  submitted = false;
  public headers: any[] = [];
  imageDetailList: AngularFireList<any>;
  types = [
    { value: "all", viewValue: "All" },
    { value: "some", viewValue: "Some" },
    { value: "none", viewValue: "None" },
  ];
  downloadURL: Observable<any>;
  JsonArray: any;
  jsonurl: any;
  temp: any[] = [];
  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;
  data_tree: any[] = [];
  temp1: any[] = [];
  constructor(
    database: FileDatabase,
    private router: Router,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private treeService: TreeService,
    private formBuilder: FormBuilder
  ) {
    this.todoCollectionRef = this.afs.collection<any>("localization");
    this.todo$ = this.todoCollectionRef.valueChanges();

    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    database.dataChange.subscribe(
      (data) => (this.nestedDataSource.data = data)
    );

    this.todo$.subscribe(res =>{
      
    })
    this.todo$.subscribe((res) => {
      res.forEach((element) => {
        this.data_tree.push(element);
      }); 


       //The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.

       console.log(this.temp , "tree data");
      TREE_DATA = JSON.stringify(this.data_tree);
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
    this.router.navigateByUrl("");
  }
   

  itemClick(node) {
    console.log("node",node)
    console.log(node.type, "game on ha");
    this.showcontent = true;
    if (this.t.length < this.data_tree.length) {
        for (let i = this.t.length; i < this.data_tree.length; i++) {
            this.t.push(this.formBuilder.group({
                name: [node.type],   
            }));
        }
    } else {
        for (let i = this.t.length; i >= this.data_tree.length; i--) {
            this.t.removeAt(i);
        }
    }
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
