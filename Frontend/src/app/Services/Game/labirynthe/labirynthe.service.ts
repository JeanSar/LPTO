import { Injectable } from '@angular/core';
import { env } from 'process';
import * as io from 'socket.io-client';
import { RoomService } from '../../Room/room.service';
import { SocketioService } from '../../Socketio/socketio.service';
import { LabiryntheGameService } from './labirynthe-game.service';

@Injectable({
  providedIn: 'root'
})

/*algo du labirynthe à implementer, à la place de tout ça*/
export class LabyrintheService extends Phaser.Scene{
  socketioService
  roomService;
  player;
  otherPlayers = [];
  cursors; 
  socket;
  myName;
  labiryntheService;

  constructor(labiryntheGameService : LabiryntheGameService) {
    super({ key: 'lobby' });
    this.labiryntheService = labiryntheGameService

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
    for ( var player of this.labiryntheService.players){
      if(player.name != this.labiryntheService.me.name){
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
    for(var player of this.labiryntheService.playersPos){
      if(player.name == this.labiryntheService.me.name){
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
    this.labiryntheService.askForMyPlayer();
    this.labiryntheService.getMyPlayer();
    this.labiryntheService.getAllPlayer();
    this.labiryntheService.getAllPositions();
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(400,300,'background');
    this.player = this.physics.add.sprite(this.labiryntheService.me.posX,this.labiryntheService.me.posY,'vachette');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    var style = { font: "16px Arial", wordWrap: true, wordWrapWidth: this.player.width, align: "center"};
    this.myName = this.add.text(0,0,this.labiryntheService.me.name,style);
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
    this.labiryntheService.socketioService.socket.on('play', () => {
      this.scene.start('lpt');
    })
  }
  
  update() {

    if(this.labiryntheService.reset){
      this.setPlayers();
      this.labiryntheService.reset = false;
    }
    if(this.labiryntheService.resetPos){
      this.setPositions();
      this.labiryntheService.resetPos = false;
    }
    
    //this.myName.x = this.player.x;
    if (this.cursors.left.isDown)
    {
      //this.player.x -= 1;
      this.myName.y = this.player.y - 53;

      this.player.anims.play('left', true);
      this.myName.x = this.player.x - 53;
      this.labiryntheService.moveLeft();
    }
    else if (this.cursors.right.isDown)
    {
      //this.player.x += 1
      this.myName.y = this.player.y - 53;

      this.player.anims.play('right', true);
      this.myName.x = this.player.x;
      this.labiryntheService.moveRight();
    }

    if (this.cursors.up.isDown)
    {
      //this.player.y -= 1;
      this.myName.y = this.player.y - 53;
      this.labiryntheService.moveUp();
    }
    if(this.cursors.down.isDown)
    {
      //this.player.y += 1;
      this.myName.y = this.player.y - 53;
      this.labiryntheService.moveDown();
    }
  }

}
/*jusque la j'imagine*/

export default LabiryntheService;