import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chats = []

  constructor(private socket:SocketService) {

    this.onReceiveMessage()//Se queda escuchando si recibe un mensaje

   }

  sendMessage(mensajeInfo){   //Enviamos un mensaje
    this.chats.push(mensajeInfo)
    this.socket.io.emit("sendMessage", mensajeInfo)
  }

  onReceiveMessage(){
    this.socket.io.on("reveiceMessage", (messageInfo)=>{
      messageInfo.messageType = false
      this.chats.push(messageInfo)
      alert("nuevo mensaje")
    })
  }


}
