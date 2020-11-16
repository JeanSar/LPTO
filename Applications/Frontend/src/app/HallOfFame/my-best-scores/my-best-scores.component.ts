import { Component, OnInit } from '@angular/core';
import { HallOfFameService } from 'src/app/Services/HallOfFame/hall-of-fame.service';
import { AuthService } from 'src/app/Services/Authentification/auth.service';

@Component({
  selector: 'app-my-best-scores',
  templateUrl: './my-best-scores.component.html',
  styleUrls: ['./my-best-scores.component.scss']
})
export class MyBestScoresComponent implements OnInit {

  myBestScores;
  constructor(private hallOfFameService : HallOfFameService,private authService: AuthService) { }

  ngOnInit(): void {
    this.setMyScores();
  }

  setMyScores() {
    let username = this.authService.user.username;
    this.hallOfFameService.getAllMyBestScores({ "username" : username}).subscribe( data => {
      this.myBestScores = data;
    })
  }

}
