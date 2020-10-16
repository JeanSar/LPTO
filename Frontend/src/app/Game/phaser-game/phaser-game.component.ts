import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import { LobbyService } from 'src/app/Services/Game/lobby.service';

@Component({
  selector: 'app-phaser-game',
  templateUrl: './phaser-game.component.html',
  styleUrls: ['./phaser-game.component.scss']
})
export class PhaserGameComponent implements OnInit {

  phaserGame: Phaser.Game;
  config : Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      height: 600,
      width: 800,
      scene: [ LobbyService ],
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
  }

}
