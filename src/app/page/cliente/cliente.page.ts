import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ProductoService } from '../../services/producto.service';

import { ToastComponent } from '../../components/toast/toast.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { UrlImgPerfilComponent } from '../../components/url-img-perfil/url-img-perfil.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})

export class ClientePage implements OnInit {
  usuario: any = {}
  cantidadCarrito: any = 0
  photoUploading: String

  constructor(
    private toastComponent: ToastComponent,
    private alertComponent: AlertComponent,
    private loadingComponent: LoadingComponent,
    public urlImgPerfilComponent: UrlImgPerfilComponent,

    private menu: MenuController,
    private router: Router,
    public _serviceUsuario: UsuarioService,
    private _serviceProducto: ProductoService,
  ) { 


  }

  ngOnInit() {

this.obtenerUsuario()
this.cantidadCarrito = localStorage.getItem('carrito')

}


 obtenerUsuario(){
    let idUsuario = localStorage.getItem('usuario')

    console.log("Tu Id de usuario: " + idUsuario)

    this._serviceUsuario.obtenerUsuario(idUsuario).subscribe(data=>{

      this.usuario = data.usuario
      this.photoUploading = this.urlImgPerfilComponent.urlCorrecta(this.usuario.imgPerfil)
      console.log(data.usuario)



    },error=>{
      console.log(error)
    })
  }

  cerrarSesion(){
    localStorage.removeItem('usuario')
    this.toastComponent.toast(`Hasta luego`)
    this.router.navigate(['/login'])
    this.menu.close()
    delete this.usuario 
  }


  /* 
  
  OPCIONES MENU

  */
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


}
