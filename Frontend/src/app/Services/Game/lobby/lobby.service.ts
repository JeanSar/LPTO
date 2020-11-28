import { Injectable } from '@angular/core';
import { env } from 'process';
import * as io from 'socket.io-client';
import { RoomService } from '../../Room/room.service';
import { SocketioService } from '../../Socketio/socketio.service';
import { LobbyGameService } from './lobby-game.service';


@Injectable({
  providedIn: 'root'
})
export class LobbyService extends Phaser.Scene{
  socketioService
  roomService;
  player;
  otherPlayers = [];
  cursors;
  socket;
  myName;
  lobbyGameService;

  constructor(lobbyGameService : LobbyGameService) {
    super({ key: 'lobby' });
    this.lobbyGameService = lobbyGameService

  }
  setPlayers() {

    for(var sprite of this.otherPlayers){
      //console.log(sprite);
      if(sprite != undefined){
        sprite.name.destroy();
        sprite.destroy();
      }
    }
    this.otherPlayers = [];
    var cpt=0;
    for ( var player of this.lobbyGameService.players){
      if(player.name != this.lobbyGameService.me.name){
        this.otherPlayers[cpt] = this.physics.add.sprite(player.posX,player.posY,'vachette');
        this.otherPlayers[cpt].setBounce(0.2);
        this.otherPlayers[cpt].setCollideWorldBounds(true);
        var style = { font: "16px Arial", wordWrap: true, wordWrapWidth: this.player.width, align: "center"};
        this.otherPlayers[cpt].name = this.add.text(0,0,player.name,style);
        this.otherPlayers[cpt].name.x = player.posX;
        this.otherPlayers[cpt].name.y = player.posY-53;
        cpt++
      }else{
        if(this.player != undefined){
          this.player.destroy();
        }
        this.player = this.physics.add.sprite(player.posX,player.posY,'vachette');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        /*var style = { font: "16px Arial", wordWrap: true, wordWrapWidth: this.player.width, align: "center"};
        this.myName = this.add.text(0,0,player.name,style);
        this.myName.x = player.x;
        this.myName.y = player.y - 53;*/
        cpt++
      }
    }
  }

  setPositions() {
    for(var player of this.lobbyGameService.playersPos){
      if(player.name == this.lobbyGameService.me.name){
        this.player.x = player.posX;
        this.player.y = player.posY;
      }else{
        for(var otherP of this.otherPlayers){
          if((player != undefined)&&(otherP != undefined)){
            if(player.name == otherP.name._text){
              otherP.x = player.posX;
              otherP.y = player.posY;
              otherP.name.x = player.posX;
              otherP.name.y = player.posY-53;
              if((player.anim == 'right')||(player.anim == 'left'))
                otherP.anims.play(player.anim, true);
            }
          }
        }
      }
    }
  }

  preload() {
    this.load.image('background','assets/champ.png');
    this.load.spritesheet('vachette','assets/spriteSheetVachette.png',
    { frameWidth: 93, frameHeight: 63 });
    this.lobbyGameService.askForMyPlayer();
    this.lobbyGameService.getMyPlayer();
    this.lobbyGameService.getAllPlayer();
    this.lobbyGameService.getAllPositions();
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(400,300,'background');
    this.player = this.physics.add.sprite(this.lobbyGameService.me.posX,this.lobbyGameService.me.posY,'vachette');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    var style = { font: "16px Arial", wordWrap: true, wordWrapWidth: this.player.width, align: "center"};
    this.myName = this.add.text(0,0,this.lobbyGameService.me.name,style);
    this.myName.x = this.player.x;
    this.myName.y = this.player.y - 53;
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('vachette',{start: 0, end : 3}),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('vachette',{start: 4, end : 7}),
      frameRate: 5,
      repeat: -1
    });
    if(true){
      this.lobbyGameService.socketioService.socket.on('play', () => {
        this.scene.start('labirynthe');
      });
    }
    else {
      this.lobbyGameService.socketioService.socket.on('play', () => {
        this.scene.start('lpt');
      });
    };

  }

  update() {

    if(this.lobbyGameService.reset){
      this.setPlayers();
      this.lobbyGameService.reset = false;
    }
    if(this.lobbyGameService.resetPos){
      this.setPositions();
      this.lobbyGameService.resetPos = false;
    }

    //this.myName.x = this.player.x;
    if (this.cursors.left.isDown)
    {
      //this.player.x -= 1;
      this.myName.y = this.player.y - 53;

      this.player.anims.play('left', true);
      this.myName.x = this.player.x - 53;
      this.lobbyGameService.moveLeft();
    }
    else if (this.cursors.right.isDown)
    {
      //this.player.x += 1
      this.myName.y = this.player.y - 53;

      this.player.anims.play('right', true);
      this.myName.x = this.player.x;
      this.lobbyGameService.moveRight();
    }

    if (this.cursors.up.isDown)
    {
      //this.player.y -= 1;
      this.myName.y = this.player.y - 53;
      this.lobbyGameService.moveUp();
    }
    if(this.cursors.down.isDown)
    {
      //this.player.y += 1;
      this.myName.y = this.player.y - 53;
      this.lobbyGameService.moveDown();
    }
  }

}

export default LobbyService;
