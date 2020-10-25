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

  isdone = false;

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
    var task1 = false;
    var task2 = false;
    var task3 = false;
    for(let i in this.data._usersID){
      if(JSON.stringify(this.user) == JSON.stringify(this.data._usersID[i]._id)){
        this.data._usersID.splice(i,1);
      }
    }
    this.me = this.user;
    this.getOwner({ "Id" : this.user}).subscribe(
      data => { this.me = data;this.me = this.me.username;
        task1 = true;if(task1&&task2&&task3){this.isdone = true}},
      error => {console.log(error.error.status)}
    )
    var cpt=0
    for(let i in this.data._usersID){
      this.getOwner({ "Id" : this.data._usersID[i]._id}).subscribe(
        data => {this.u=data;this.users.push(this.u.username);
          if(cpt == this.data._usersID.length-1){task2 = true;if(task1&&task2&&task3){this.isdone = true}};cpt++;},
        error => {console.log(error.error.status);}
      )
    }
    if(cpt == 0){
      task2 = true;
      if(task1&&task2&&task3) {this.isdone = true;}
    }
    this.getOwner({ "Id" : this.data._ownerId}).subscribe(
      data => {this.ownerName = data;this.ownerName = this.ownerName.username;
        task3 = true;if(task1&&task2&&task3){this.isdone=true;}},
      error => {console.log(error.error.status)}
    ) 
  }

}
