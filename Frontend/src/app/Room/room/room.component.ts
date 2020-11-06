import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Authentification/auth.service';
import { RoomService } from 'src/app/Services/Room/room.service';
import { SocketioService } from 'src/app/Services/Socketio/socketio.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  currentMessage ="";
  confirmLeave = false;

  constructor(public roomService : RoomService,private socketioService : SocketioService,private authService : AuthService,public router: Router) { 
    //authService.isAuth = false;
  }

  ngOnInit(): void {
    this.socketioService.setupSocketConnection();
    for(let i in this.roomService.data._usersID){
      if(JSON.stringify(this.roomService.user) == JSON.stringify(this.roomService.data._usersID[i]._id)){
        this.roomService.data._usersID.splice(i,1);
      }
    }
    this.roomService.setupRoom();
    this.socketioService.getNewUsers();
    this.socketioService.getMessages();
  }
  ngOnDestroy(){
    this.socketioService.destroyConnection();
    this.roomService.messages = [];
  }

  sendMyMessage() {
    this.socketioService.sendMessage("[" + this.roomService.me + "] : " + this.currentMessage);
    this.currentMessage = "";
  }

  leaveRoom(){
    this.router.navigate(['home']);
  }

  play(){
    this.socketioService.socket.emit('play');
  }

  scrollToBottom(){
    document.getElementById('chatlist').scrollTop = document.getElementById('chatlist').scrollHeight;
  }

}
