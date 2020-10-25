import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RoomService } from '../Room/room.service';
import * as io from 'socket.io-client';
import { LobbyGameService } from '../Game/lobby/lobby-game.service';
import { LobbyService } from '../Game/lobby/lobby.service';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket;

  constructor(private roomService : RoomService) { }

  setupSocketConnection() {
    this.socket = io(environment.ROOT_URL);
    this.socket.emit('ID', { "UserId" : this.roomService.user, "RoomKey" : this.roomService.key});
    this.roomService.getOwner({ "Id" : this.roomService.user}).subscribe(
      data => {this.roomService.u = data;this.sendMessage(`${this.roomService.u.username} join the room`)},
      error => {console.log(error.error.status)}
    )
  }
  destroyConnection() {
    this.roomService.data
    this.socket.emit('Fdisconnect');
    this.roomService.getOwner({ "Id" : this.roomService.user}).subscribe(
      data => {this.roomService.u = data;this.sendMessage(`${this.roomService.u.username} left the room`)},
      error => {console.log(error.error.status)}
    )
  }

  getNewUsers = () => {
    this.socket.on('User join',() => {
      this.roomService.getRoom({ 'RoomKey' : this.roomService.key}).subscribe(
        data => {this.roomService.data = data;this.roomService.setupRoom();},
        error => console.log(error.error.status)
      )
    });
    this.socket.on('User left', () => {
      this.roomService.getRoom({ 'RoomKey' : this.roomService.key}).subscribe(
        data => {this.roomService.data = data;this.roomService.setupRoom();},
        error => console.log(error.error.status)
      )
    });
  }

  sendMessage(message){
    this.socket.emit('new-message', message);
  }

  getMessages = ()  => {
    this.socket.on('new-message', (message) => {
      this.roomService.messages.push(message);
    });
  }
}
