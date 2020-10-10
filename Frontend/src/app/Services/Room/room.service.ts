import { Injectable } from '@angular/core';
import { WebService } from '../Web/web.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  data;
  user;
  key;

  ownerName;
  users = [];
  me;
  u;

  message : string;
  messages : string[] = [];

  constructor(private webService : WebService) { 
  }
  getOwner(data) {
    return this.webService.post('username',data);
  }

  getRoom(data){
    return this.webService.post('room',data);
  }

  setupRoom(){
    this.users = []
    for(let i in this.data._usersID){
      if(JSON.stringify(this.user) == JSON.stringify(this.data._usersID[i]._id)){
        this.data._usersID.splice(i,1);
      }
    }
    console.log(this.data._usersID);
    this.me = this.user;
    this.getOwner({ "Id" : this.user}).subscribe(
      data => { this.me = data;this.me = this.me.username;},
      error => {console.log(error.error.status)}
    )
    for(let i in this.data._usersID){
      console.log(this.data._usersID[i]);
      this.getOwner({ "Id" : this.data._usersID[i]._id}).subscribe(
        data => {this.u=data;this.users.push(this.u.username)},
        error => {console.log(error.error.status);}
      )
    }
    this.getOwner({ "Id" : this.data._ownerId}).subscribe(
      data => {this.ownerName = data;this.ownerName = this.ownerName.username;},
      error => {console.log(error.error.status)}
    ) 
  }

}
