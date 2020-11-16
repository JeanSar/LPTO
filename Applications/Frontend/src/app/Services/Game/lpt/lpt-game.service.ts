import { Injectable, OnInit } from '@angular/core';
import { RoomService } from '../../Room/room.service';
import { SocketioService } from '../../Socketio/socketio.service';

@Injectable({
  providedIn: 'root'
})
export class LptGameService {

  players = {};
  me = {};
  socketioService;
  roomService;
  scores;

  constructor(roomService : RoomService,socketioService : SocketioService) {
    this.roomService = roomService;
    this.socketioService = socketioService;
  }

  endGame(score,nbUsers,owner) {
    this.socketioService.socket.emit('end',score,nbUsers,owner);
    console.log("jenvoi la fin")
  }

  getScores() {
    return new Promise((resolve,reject) => {
      this.socketioService.socket.on('scores',(tabScores) => {
        console.log("c la fin les amis");
        resolve(tabScores);
      });
    })
  }
}
