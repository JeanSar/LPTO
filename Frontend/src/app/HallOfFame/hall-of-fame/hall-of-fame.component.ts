import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hall-of-fame',
  templateUrl: './hall-of-fame.component.html',
  styleUrls: ['./hall-of-fame.component.scss']
})
export class HallOfFameComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  returnHome(){
    this.router.navigate(['home']);
  }

}
