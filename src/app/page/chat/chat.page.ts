import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  texto = '';
  room: string
  infoChat: any = {}
  idUsuario: string = ""
  mensajesObtenidos: any = []
  emisorId: string
  receptorId: string
  messageInfo: any = {}
  constructor(
    public chat: ChatService,
    public modalController: ModalController,
    private router: ActivatedRoute,
    private cookieService: CookieService,
    private location:Location,
    private _serviceUsuario: UsuarioService
  ) {}

  ngOnInit() {
    this.room = this.router.snapshot.paramMap.get('room')
    this.receptorId = this.router.snapshot.paramMap.get('room')
    this.emisorId = localStorage.getItem('usuario')

    this.cookieService.set('room',this.room)  //cambiar a storage!!!!!!!!!!
    this.informacionChat()
  }



  sendMessage() {
     this.messageInfo = {
      mensaje: this.texto,
      messageType: true, //uno si se envia 2 si se recibe
      emisorId: this.emisorId,
      receptorId: this.room
    };

    this.chat.sendMessage(this.messageInfo);
    console.log(this.texto);
    this.texto = '';
  }




  informacionChat(){
    this._serviceUsuario.obtenerUsuario(this.receptorId).subscribe(data=>{
      this.infoChat = data.usuario
      this.mensajesObtenidos = data.usuario.chat

      console.log(this.mensajesObtenidos)

    },error=>{console.log("Error en el sistema: " + error)})

  }






  volverSala() {

      this.location.back()
      this.texto = "";
      this.room = "";
      this.idUsuario = "";
      this.messageInfo = {}
    }
}
