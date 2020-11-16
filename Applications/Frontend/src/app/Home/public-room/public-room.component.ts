import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Authentification/auth.service';
import { HomeService } from 'src/app/Services/Home/home.service';
import { RoomService } from 'src/app/Services/Room/room.service';

@Component({
  selector: 'app-public-room',
  templateUrl: './public-room.component.html',
  styleUrls: ['./public-room.component.scss']
})
export class PublicRoomComponent implements OnInit {

  public_Room : Object;
  public_Rooms : Array<Object> = [];
  error : string;
  refresh;
  constructor(private homeService : HomeService,public router: Router,private roomService : RoomService,private authService : AuthService) { 
  }

  setupRoom(data){
    for(let rm of data){
      this.homeService.getOwner({ "Id" : rm._ownerId}).subscribe(
        data => {this.public_Room = {
          roomId : rm._id,
          OwnerName : data,
          nb : rm._usersID.length + 1,
          full : rm.full,
          key : rm.key
        };this.public_Rooms.push(this.public_Room);
      },
        error => {this.error = error.error.status;}
      )
  
    } 
  }

  setRooms() {
    this.public_Rooms = [];
    this.homeService.getAllPublicRooms().subscribe(
      data => {this.setupRoom(data)},
      error => {this.error = error.error.status;}
    )
  }

  ngOnInit(): void {
    this.refresh = setInterval(() => {this.setRooms()},2000);
  }
  ngOnDestroy(): void {
    clearInterval(this.refresh);
  }

  joinRoom(id : string,key : string){
    console.log(id);
    console.log(key);
    document.getElementById('btnjoin').classList.remove('is-invalid');
    this.homeService.joinRoom({ "UserId" : id, "RoomKey" : key }).subscribe(
      data => {this.roomService.data=data;
        this.homeService.inRoom=true;
        this.router.navigate(['room']);
        this.roomService.key = key;
        this.roomService.user = this.authService.user._id},
      error => {this.error = error.error.status;console.log(this.error);if(this.error == "already on a room"){
        document.getElementById('btnjoin').classList.add('is-invalid');
      }else{
        this.setRooms()}}
    );
    /* requete a faire */
    return;
  }


}
