import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Authentification/auth.service';
import { HomeService } from 'src/app/Services/Home/home.service';
import { RoomService } from 'src/app/Services/Room/room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {

  check = false;
  error : string;

  constructor(private homeService : HomeService,private authService: AuthService,public router: Router, private roomService: RoomService) {
   }

  ngOnInit(): void {
  }

  create(){
    document.getElementById('createBtn').classList.remove('is-invalid');
    this.homeService.createRoom({ "Id" : this.authService.user._id, "public" : !this.check}).subscribe(
      data => {this.roomService.data=data;
               this.homeService.inRoom=true;
               this.router.navigate(['room']);
               this.roomService.key = this.roomService.data.key;
               this.roomService.user = this.authService.user._id},
      error => {this.error = error.error.status;document.getElementById('createBtn').classList.add('is-invalid');}
    );
  }

}
