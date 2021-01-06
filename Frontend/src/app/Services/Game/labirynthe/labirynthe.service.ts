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

  map;

  labiryntheGameService;

  constructor(labiryntheGameService : LabiryntheGameService) {
    super({ key: 'labirynthe' });
    this.labiryntheGameService = labiryntheGameService;

  }

  preload() {
    this.map = this.labiryntheGameService.roomService.laby;

    function printMap(map) {
    	let aff = String("");
    	for(let i = 0; i < map.length; i++) {
        for(let j = 0; j < map[0].length; j++) {
          if(map[i][j] === 0) {
            aff += "██";
          }
          else {
            aff += "  ";
          }
        }
        aff += "\n";
      }
      return aff
    }

    console.log(printMap(this.map));
    //ici on charge les images
  }

  create() {
    //ici on les affiches
  }


  update() {
    //ici les déplacements
  }

}

export default LabiryntheService;
