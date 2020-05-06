import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService : AuthService,private router: Router) { }
  
  user = {
    email: '',
    password: '',
  }
  

  ngOnInit(): void {

   
  }

  mainPage(){
    this.router.navigateByUrl('')
  }
  onSubmit(){
    this.authService.login(this.user.email , this.user.password)
    if(this.authService.user)
    {
      console.log("hello");
      
    }
    else{
      console.log("no hello");
    }

  
  }

  logout()
  {
    this.authService.logout();
  }
}
