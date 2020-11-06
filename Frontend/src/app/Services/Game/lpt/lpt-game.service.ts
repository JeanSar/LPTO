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

  constructor(roomService : RoomService,socketioService : SocketioService) {
    this.roomService = roomService;
    this.socketioService = socketioService;
  }

  
}
