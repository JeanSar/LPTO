import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Authentification/auth.service';
import { HomeService } from 'src/app/Services/Home/home.service';
import { RoomService } from 'src/app/Services/Room/room.service';

@Component({
  selector: 'app-private-room',
  templateUrl: './private-room.component.html',
  styleUrls: ['./private-room.component.scss']
})
export class PrivateRoomComponent implements OnInit {

  key : string;
  error;

  constructor(private homeService : HomeService,public router: Router,private authService : AuthService, private roomService : RoomService) { }

  ngOnInit(): void {
  }

  join(){
    document.getElementById('roomKey').classList.remove('is-invalid');
    this.homeService.joinRoom({ "UserId" : this.authService.user._id, "RoomKey" : this.key }).subscribe(
      data => {this.roomService.data = data;
               this.homeService.inRoom=true;
               this.router.navigate(['room'])
               this.roomService.key = this.key;
               this.roomService.user = this.authService.user._id},
      error => {this.error = error.error.status;document.getElementById('roomKey').classList.add('is-invalid');}
    )
  }

}