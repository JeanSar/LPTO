import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/model/User';
import { AuthService } from 'src/app/Services/Authentification/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {
  username : string;
  password : string;
  confirm_password : string;
  error : string;
  notLoading = true;

  response : Object;
  user = User;

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  signIn(){
    this.notLoading = false;
    document.getElementById('username').classList.remove('is-invalid');
    document.getElementById('password').classList.remove('is-invalid');
    document.getElementById('confirm_password').classList.remove('is-invalid');
    if((this.username == undefined)||(this.username.length < 3)){
      this.error = "username must need at least 3 characters";
      document.getElementById('username').classList.add('is-invalid');
      this.notLoading = true;
      return;
    }
    else if((this.password == undefined)||(this.password.length < 5)){
      this.error = "password must need at least 5 characters";
      document.getElementById('password').classList.add('is-invalid');
      this.notLoading = true;
      return;
    }
    else if(this.password != this.confirm_password){
      this.error = "passwords do not match";
      document.getElementById('confirm_password').classList.add('is-invalid');
      this.notLoading = true;
      return
    }
    else{
      this.response = this.authService.Register({ 'username' : this.username, 'password' : this.password }).subscribe(
        data => {this.authService.authenticate(data);this.router.navigate(['home'])},
        error => {if(error){this.error = "This Username already exist ";
        document.getElementById('username').classList.add('is-invalid');this.notLoading = true;}});
        
    }
  }

}
