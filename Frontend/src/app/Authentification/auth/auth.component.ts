import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/Authentification/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  
  registerMode = false;
  constructor(private authService : AuthService){
    authService.isAuth = false;
  }


  ngOnInit(): void {
  }

  onSwitchMode(){
    this.registerMode = !this.registerMode;
  }

  whichMode(){
    if(!this.registerMode){
      return "Click here to sign in !"
    }else{
      return "Click here to login !"
    }
  }

}
