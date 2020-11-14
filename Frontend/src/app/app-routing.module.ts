import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './Authentification/auth/auth.component';
import { HallOfFameComponent } from './HallOfFame/hall-of-fame/hall-of-fame.component';
import { HomeComponent } from './Home/home/home.component';
import { RoomComponent } from './Room/room/room.component';
import { AuthGuardService } from './Services/guard/auth-guard.service';
import { RoomGuardService } from './Services/guard/room-guard.service';

const routes: Routes = [
  {path : '', component: AuthComponent },
  {path : 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path  : 'room', component: RoomComponent, canActivate: [RoomGuardService]},
  {path : 'hall', component : HallOfFameComponent, canActivate : [AuthGuardService]},
  {path : '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
