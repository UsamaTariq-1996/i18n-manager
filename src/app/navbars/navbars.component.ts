import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbars',
  templateUrl: './navbars.component.html',
  styleUrls: ['./navbars.component.scss']
})
export class NavbarsComponent implements OnInit {
  types = [
    {value: 'all', viewValue: 'All'},
    {value: 'some', viewValue: 'Some'},
    {value: 'none', viewValue: 'None'}
  ];
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.router.navigateByUrl('');
  }
}
