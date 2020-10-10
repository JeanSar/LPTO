import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './Authentification/auth/auth.component';
import { HomeComponent } from './Home/home/home.component';
import { AuthGuardService } from './Services/guard/auth-guard.service';

const routes: Routes = [
  {path : '', component: AuthComponent },
  {path : 'home', component: HomeComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
