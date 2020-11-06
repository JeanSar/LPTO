import { Injectable } from '@angular/core';
import { env } from 'process';
import * as io from 'socket.io-client';
import { RoomService } from '../../Room/room.service';
import { SocketioService } from '../../Socketio/socketio.service';
import { LptGameService } from './lpt-game.service';

@Injectable({
  providedIn: 'root'
})
export class LptService extends Phaser.Scene{
  socketioService
  roomService;
  player;
  otherPlayers = [];
  socket;
  myName;
  lptGameService;
  vachette1;
  vachette2;
  vachette3;
  vachette4;
  vachette5;
  score;
  scoreText;
  moo;
  delay;
  preRand;
  pointer;
  hit;
  miss;
  wedo;
  canMiss;
  nrv;
  bg;

  constructor(lptGameService : LptGameService) {
    super({ key: 'lpt' });
    this.lptGameService = lptGameService
  }

  preload() {
    this.load.image('lptBackground', 'assets/lptChamp.png');
    this.load.spritesheet('lptVachette', 'assets/lptVachette.png',
    { frameWidth: 93, frameHeight: 58});
    this.load.spritesheet('lptVachetteNrv', 'assets/lptVachetteNrv.png',
    {frameWidth: 414, frameHeight: 345});
    this.load.image('heart', 'assets/heart.png');
    this.load.image('moo', 'assets/meuh.png');
  }

  create() {
    this.pointer = this.input.activePointer;
    this.score = 0;
    this.preRand = 0;
    this.hit = false;
    this.miss = false;
    this.wedo = false;
    this.canMiss = true;
    this.bg = this.physics.add.sprite(400,300,'lptBackground');
    this.bg.setScale(1.03);
    this.vachette1 = this.physics.add.sprite(200,150,'lptVachette');
    this.vachette2 = this.physics.add.sprite(600,150,'lptVachette');
    this.vachette3 = this.physics.add.sprite(200,425,'lptVachette');
    this.vachette4 = this.physics.add.sprite(600,425,'lptVachette');
    this.vachette5 = this.physics.add.sprite(400,300,'lptVachette');
    this.nrv = this.physics.add.sprite(375,225,'lptVachetteNrv');
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('lptVachette',{start: 0, end: 3}),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'nrv',
      frames: this.anims.generateFrameNumbers('lptVachetteNrv',{start: 0, end: 1}),
      frameRate: 5,
      repeat: -1
    });
    this.scoreText = this.add.text(16,16,'score ' + this.score, {fontSize: '32px', fill:'#ff0044'});
    this.moo = this.physics.add.sprite(435,250,'moo');
    this.preRand = 5;
    this.nrv.visible = false;
  }

  update() {
    this.vachette1.anims.play('idle', true);
    this.vachette2.anims.play('idle', true);
    this.vachette3.anims.play('idle', true);
    this.vachette4.anims.play('idle', true);
    this.vachette5.anims.play('idle', true);
    this.nrv.anims.play('nrv', true);
    this.scoreText.setText('score ' + this.score);
    if(!this.pointer.isDown) {
      this.wedo = false;
    }
    if (this.pointer.isDown && this.wedo == false) {
      if (this.moo.x - 81 < this.pointer.x && this.moo.x + 11 > this.pointer.x && this.moo.y + 21 < this.pointer.y && this.moo.y + 79 > this.pointer.y)
          this.hit = true;
      else
        this.miss = true;
      this.wedo = true;
    }
    if (this.hit == true) {
      //console.log("hit");
      this.meuh();
      this.score++;
    }
    if (this.miss == true && this.canMiss == true) {
      //console.log("miss");
      this.canMiss = false;
      this.moo.x = -333;
      this.nrv.visible = true;
      setTimeout(() => {
        this.missEvent();
      }, 3000);
    }
  }

  missEvent() {
    console.log("missEvent");
    this.meuh();
  }

  meuh() {
    //console.log("meuh");
    var rand = Math.floor(Math.random() * 5) + 1;
    if (rand == this.preRand) {
      if (rand != 5)
        rand++;
      else 
        rand--;
    }
    switch (rand) {
      case 1:
        //console.log("1");
        this.moo.x = this.vachette1.x + 35;
        this.moo.y = this.vachette1.y - 50;
        break;
      case 2:
        //console.log("2");
        this.moo.x = this.vachette2.x + 35;
        this.moo.y = this.vachette2.y - 50;
        break;
      case 3:
        //console.log("3");
        this.moo.x = this.vachette3.x + 35;
        this.moo.y = this.vachette3.y - 50;
        break;
      case 4:
        //console.log("4");
        this.moo.x = this.vachette4.x + 35;
        this.moo.y = this.vachette4.y - 50;
        break;
      case 5:
        //console.log("5");
        this.moo.x = this.vachette5.x + 35;
        this.moo.y = this.vachette5.y - 50;
        break;
    }
    this.preRand = rand;
    this.hit = false;
    this.miss = false;
    this.canMiss = true;
    this.nrv.visible = false;
  }
}

export default LptService;
