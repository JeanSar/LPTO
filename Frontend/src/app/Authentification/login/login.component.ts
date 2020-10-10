import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Authentification/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  username : string;
  password : string;
  error : string;
  notLoading = true;

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  login(){
     this.notLoading = false;
     document.getElementById('username').classList.remove('is-invalid');
     document.getElementById('password').classList.remove('is-invalid');
    if(this.username == undefined){
      this.error = "please fill username";
      document.getElementById('username').classList.add('is-invalid');
      this.notLoading = true;
      return;
    }else if(this.password == undefined){
      this.error = "please fill password";
      document.getElementById('password').classList.add('is-invalid');
      this.notLoading = true;
      return;
    }else{
      this.authService.Login({ "username" : this.username, "password" : this.password}).subscribe(
        data => {this.authService.authenticate(data);this.router.navigate(['home'])},
        error => {this.error = error.error.status
        if(this.error.startsWith('wrong')){
          document.getElementById('password').classList.add('is-invalid');
          this.notLoading = true
        }else{
          document.getElementById('username').classList.add('is-invalid');
          this.notLoading = true;
        }}
        )
    
  }
}
}
