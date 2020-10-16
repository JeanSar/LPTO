import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LobbyService extends Phaser.Scene{
  player;
  cursors;

  constructor() {
    super({ key: 'main' });
  }

  preload() {
    this.load.image('background','assets/champ.png');
    this.load.spritesheet('vachette','assets/spriteSheetVachette.png',
    { frameWidth: 93, frameHeight: 63 });
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(400,300,'background');
    this.player = this.physics.add.sprite(100,450,'vachette');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
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
  }
  
  update() {
    if (this.cursors.left.isDown)
    {
      this.player.x -= 1;

      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
      this.player.x += 1

      this.player.anims.play('right', true);
    }

    if (this.cursors.up.isDown)
    {
      this.player.y -= 1;
    }
    if(this.cursors.down.isDown)
    {
      this.player.y += 1;
    }
  }

}
