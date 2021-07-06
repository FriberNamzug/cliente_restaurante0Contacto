import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  usuario: Usuario

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private menu: MenuController,
    private router: Router,
    private _serviceUsuario: UsuarioService

  ) { }

  ngOnInit() {

    this.usuario = {}
    this.obtenerUsuario()
  }


 obtenerUsuario(){

    let idUsuario = JSON.parse(localStorage.getItem('usuario'))
    console.log("Tu Id de usuario: " + idUsuario)

   this._serviceUsuario.obtenerUsuario(idUsuario).subscribe(data=>{


    this.usuario = data.usuario

    console.log(this.usuario)


    },error=>{
      console.log(error)
    })

  }


  cerrarSesion(){

    localStorage.removeItem('usuario')
    this.toast(`Hasta luego`)

    this.router.navigate(['/login'])
    this.menu.close()
    delete this.usuario 

  }


  openMenu() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  verPerfil(){
   this.router.navigate(['/cliente/mi-perfil'])
   this.menu.close()
  }
  historialPedidos(){
   this.router.navigate(['/cliente/historial-pedidos'])
   this.menu.close()
  }
  metodosPago(){
   this.router.navigate(['/cliente/metodos-pago'])
   this.menu.close()
  }
  ayuda(){
   this.router.navigate(['/cliente/ayuda'])
   this.menu.close()
  }

  acercaDe(){
    this.router.navigate(['/cliente/ayuda'])
    this.menu.close()
  }


  ////////////////////////////////////////////////////
  //        Esto envia las alertas
  ////////////////////////////////////////////////////
  
  async alerta(titulo:string,mensaje?:string){
    const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: titulo,
    message: mensaje,
    buttons: ['OK']
  });

  await alert.present();

}



async toast(mensaje:string){

  const toast = await this.toastController.create({
    message: mensaje,
    duration: 2000
  });


  await toast.present();
}



}
