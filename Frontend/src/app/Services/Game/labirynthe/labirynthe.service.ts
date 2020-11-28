import { Injectable } from '@angular/core';
import { env } from 'process';
import * as io from 'socket.io-client';
import { RoomService } from '../../Room/room.service';
import { SocketioService } from '../../Socketio/socketio.service';
import { LabiryntheGameService } from './labirynthe-game.service';

@Injectable({
  providedIn: 'root'
})

export class LabiryntheService extends Phaser.Scene{

  labiryntheService;

  constructor(labiryntheGameService : LabiryntheGameService) {
    super({ key: 'labirynthe' });
    this.labiryntheService = labiryntheGameService

  }

  preload() {
    
  }

  create() {

  }


  update() {

  }

}

export default LabiryntheService;
