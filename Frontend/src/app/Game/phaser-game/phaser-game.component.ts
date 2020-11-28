import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import { LobbyGameService } from 'src/app/Services/Game/lobby/lobby-game.service';
import { LobbyService } from 'src/app/Services/Game/lobby/lobby.service';
import { LptGameService } from 'src/app/Services/Game/lpt/lpt-game.service';
import { LptService } from 'src/app/Services/Game/lpt/lpt.service';
import { GameSocketService } from 'src/app/Services/GameSocketService/game-socket-service';
import { LabiryntheGameService } from 'src/app/Services/Game/labirynthe/labirynthe-game.service';
import { LabiryntheService } from 'src/app/Services/Game/labirynthe/labirynthe.service';
import { RoomService } from 'src/app/Services/Room/room.service';
import { SocketioService } from 'src/app/Services/Socketio/socketio.service';

@Component({
  selector: 'app-phaser-game',
  templateUrl: './phaser-game.component.html',
  styleUrls: ['./phaser-game.component.scss']
})
export class PhaserGameComponent implements OnInit {

  phaserGame: Phaser.Game;
  config : Phaser.Types.Core.GameConfig;
  lobby;
  lptGame;
  lptGameService;
  labiryntheGame;
  labiryntheGameService;
  constructor(private gameSocketService : GameSocketService,private roomService : RoomService,private socketioService : SocketioService,private lobbyGameService : LobbyGameService) {
    this.lobbyGameService = new LobbyGameService(this.roomService,this.socketioService);
    this.lobby = new LobbyService(this.lobbyGameService);
    this.lptGameService = new LptGameService(this.roomService,this.socketioService);
    this.lptGame = new LptService(this.lptGameService,this.roomService);
    this.labiryntheGameService = new LabiryntheGameService(this.roomService, this.socketioService);
    this.labiryntheGame = new LabiryntheService(this.labiryntheGameService);
    this.config = {
      type: Phaser.AUTO,
      height: 600,
      width: 800,
      parent : 'gameBox',
      scene : [this.lobby, this.lptGame],
      physics: {
        default: 'arcade',
        arcade: {
          debug: false
          /*gravity : { y : 100 }*/
        }
      }
    };
   }

  ngOnInit(): void {
    this.phaserGame = new Phaser.Game(this.config);
    //this.phaserGame.scene.start('lobby');
    this.phaserGame.scene.start('labiryntheGame');

  }

  ngOnDestroy() {
    this.phaserGame.destroy(false,false);
    this.lobbyGameService.disconnect();
    delete this.lobbyGameService;
  }
}
