import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { ModalController } from '@ionic/angular';
import { ChatPage } from '../../chat/chat.page';
import { Router } from '@angular/router';
import { Url } from '../../../class/url';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.page.html',
  styleUrls: ['./mensaje.page.scss'],
})
export class MensajePage implements OnInit {
  usuarios: any = [];

  constructor(
    private _serviceUsuario: UsuarioService,
    public modalController: ModalController,
    private router: Router,
    public url: Url
  ) {}

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this._serviceUsuario.obtenerUsuarios().subscribe((data) => {
      this.usuarios = data.usuarios;
      console.log(data);
    });
  }

  async verChat(id) {
    this.router.navigate([`/chat/${id}`])
  }
}
