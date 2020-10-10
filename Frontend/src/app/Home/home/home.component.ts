import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Authentification/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, public router: Router) {}
  user = this.authService.user;
  
  

  ngOnInit(): void {
  }

  disconnect(){
    this.authService.user = null;
    this.authService.isAuth = false;
    this.router.navigate(['']);
  }

}
