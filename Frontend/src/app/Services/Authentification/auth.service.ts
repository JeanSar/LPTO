import { Injectable } from '@angular/core';
import User from 'src/app/model/User';
import { WebService } from '../Web/web.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = false;
  user : User
  constructor(private webService: WebService) { }

  Register(data : Object) {
    return this.webService.post("create_account",data);
  }

  Login(data : Object) {
    return this.webService.post("login",data);
  }

  authenticate(user){
    this.user = user;
    this.isAuth = true;
  }

  isAuthenticated(){
    return this.isAuth;
  }

}
