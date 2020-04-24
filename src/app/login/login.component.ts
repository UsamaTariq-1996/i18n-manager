import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
<<<<<<< HEAD

  constructor(public authService : AuthService) { }
=======
  
  user = {
    email: '',
    password: '',
  }
  constructor() { }
>>>>>>> bcb79ba04dbbc73d697c4664412df8f28bd2c8a8

  ngOnInit(): void {

   
  }

  login()
  {
    
  }
  onSubmit(){
    console.log("User", this.user);
  }
}
