import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../Web/web.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  inRoom = false;

  constructor(private webService: WebService,public router: Router) {
   }

   createRoom(data : Object) {
    return this.webService.post("create_room",data);
  }

  getAllPublicRooms() {
    return this.webService.get("all_publicRoom");
  }

  getOwner(data) {
    return this.webService.post('username',data);
  }

  isInRoom() {
    return this.inRoom;
  }

  joinRoom(data) {
    return this.webService.put('join_room',data);
  }
}
