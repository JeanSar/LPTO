import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HomeService } from '../Home/home.service';

@Injectable({
  providedIn: 'root'
})
export class RoomGuardService implements CanActivate {

  constructor(private homeService : HomeService,private router : Router) { }

  canActivate() : boolean{
    if(this.homeService.isInRoom()){
      return true;
    }else{
      this.router.navigate(['']);
      return false;
    }
  }
}
