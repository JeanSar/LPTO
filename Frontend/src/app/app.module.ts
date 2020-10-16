import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './Authentification/auth/auth.component';
import { LoginComponent } from './Authentification/login/login.component';
import { SigninComponent } from './Authentification/signin/signin.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './Home/home/home.component';
import { CreateRoomComponent } from './Home/create-room/create-room.component';
import { PrivateRoomComponent } from './Home/private-room/private-room.component';
import { PublicRoomComponent } from './Home/public-room/public-room.component';
import { RoomComponent } from './Room/room/room.component';
import { PhaserGameComponent } from './Game/phaser-game/phaser-game.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    SigninComponent,
    HomeComponent,
    CreateRoomComponent,
    PrivateRoomComponent,
    PublicRoomComponent,
    RoomComponent,
    PhaserGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
