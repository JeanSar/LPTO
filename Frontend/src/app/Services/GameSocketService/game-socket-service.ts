import { Injectable } from '@angular/core';
import { env } from 'process';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class GameSocketService {
    constructor() {}
  /*start() {
    io.listen(env.MY_URL);
    io.on('connection', function(socket) {
      console.log('a user connected');
      socket.on('disconnect', function() {
        console.log('user disconected');
      })
    })
  }*/
  
}
