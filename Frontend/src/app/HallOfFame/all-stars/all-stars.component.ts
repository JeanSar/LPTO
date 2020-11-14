import { Component, OnInit } from '@angular/core';
import { HallOfFameService } from 'src/app/Services/HallOfFame/hall-of-fame.service';

@Component({
  selector: 'app-all-stars',
  templateUrl: './all-stars.component.html',
  styleUrls: ['./all-stars.component.scss']
})
export class AllStarsComponent implements OnInit {

  constructor(private hallOfFameService: HallOfFameService) { }

  allBestScores;
  
  ngOnInit(): void {
    this.setAllScores();
  }

  setAllScores(){
    this.hallOfFameService.getAllBestScores().subscribe( data => {
      console.log(data);
      this.allBestScores = data;
    })
  }

}
