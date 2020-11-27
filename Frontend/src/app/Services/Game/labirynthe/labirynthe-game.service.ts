import { Injectable, OnInit } from '@angular/core';
import { RoomService } from '../../Room/room.service';
import { SocketioService } from '../../Socketio/socketio.service';

@Injectable({
  providedIn: 'root'
})
export class LabiryntheGameService {

  players = {};
  playersPos = {};
  me = {};
  socketioService;
  roomService;

  reset = false;
  resetPos = false;

  constructor(roomService : RoomService,socketioService : SocketioService) {
    this.roomService = roomService;
    this.socketioService = socketioService;
  }
  
  askForMyPlayer() {
    this.socketioService.socket.emit('get-my-player');
    this.socketioService.socket.emit('all-player');
  }
  getMyPlayer = () => {
    this.socketioService.socket.on('my-player', (player) => {
      this.me = player;
    })
  }
  getAllPlayer = () => {
    this.socketioService.socket.on('all-player',(players) => {
      this.players = Object.keys(players).map(function(playersIndex){
        let player = players[playersIndex];
        return player;
      });
      this.reset = true;
    })
  }

  getAllPositions = () => {
    this.socketioService.socket.on('all-position',(players) => {
      this.playersPos = Object.keys(players).map(function(playersIndex){
        let player = players[playersIndex];
        return player;
      });
      this.resetPos = true;
    })
  }

  moveRight() {
    this.socketioService.socket.emit('move-right');
  }
  moveLeft() {
    this.socketioService.socket.emit('move-left');
  }
  moveUp() {
    this.socketioService.socket.emit('move-up');
  }
  moveDown() {
    this.socketioService.socket.emit('move-down');
  }




  disconnect(){
    this.socketioService.socket.emit('Fdisconnect')
  }

}
