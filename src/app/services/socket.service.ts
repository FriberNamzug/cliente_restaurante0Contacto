import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class SocketService {


  io = io("http://localhost:3000/", {
    withCredentials: true,
    autoConnect: true,
    transports: ['websocket', 'polling', 'flashsocket'],
    query:{
      nameRoom: this.cookie.get('room')
    }
  })


  constructor(public cookie:CookieService) {   }









}
