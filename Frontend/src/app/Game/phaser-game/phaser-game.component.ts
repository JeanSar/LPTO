import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import { LobbyGameService } from 'src/app/Services/Game/lobby/lobby-game.service';
import { LobbyService } from 'src/app/Services/Game/lobby/lobby.service';
import { GameSocketService } from 'src/app/Services/GameSocketService/game-socket-service';
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

  constructor(private gameSocketService : GameSocketService,private roomService : RoomService,private socketioService : SocketioService,private lobbyGameService : LobbyGameService) {
    this.lobbyGameService = new LobbyGameService(this.roomService,this.socketioService);
    this.lobby = new LobbyService(this.lobbyGameService);
    this.config = {
      type: Phaser.AUTO,
      height: 600,
      width: 800,
      scene: [ this.lobby ],
      parent : 'gameBox',
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
  }

  ngOnDestroy() {
    this.phaserGame.destroy(false,false);
    this.lobbyGameService.disconnect();
    delete this.lobbyGameService;
  }

}
