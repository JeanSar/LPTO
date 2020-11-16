import { Injectable } from '@angular/core';
import { WebService } from '../Web/web.service';

@Injectable({
  providedIn: 'root'
})
export class HallOfFameService {

  constructor(private webService: WebService) {
    
   }
   getAllMyBestScores(data){
    return this.webService.post("myBestScore",data);
  }

  getAllBestScores(){
    return this.webService.get("allStars");
  }


}
