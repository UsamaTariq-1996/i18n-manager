import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService : AuthService) { }
  
  user = {
    email: '',
    password: '',
  }
  

  ngOnInit(): void {

   
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
