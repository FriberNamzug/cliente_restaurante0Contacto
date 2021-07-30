import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { ModalController } from '@ionic/angular';
import { ChatPage } from '../../chat/chat.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.page.html',
  styleUrls: ['./mensaje.page.scss'],
})
export class MensajePage implements OnInit {
  empleados: any = [];

  constructor(
    private _serviceUsuario: UsuarioService,
    public modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    this._serviceUsuario.obtenerEmpleados().subscribe((data) => {
      this.empleados = data.usuarios;
      console.log(data);
    });
  }

  async verChat(id) {
    this.router.navigate([`/chat/${id}`])
  }
}
