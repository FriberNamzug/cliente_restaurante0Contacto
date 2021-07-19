import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { UrlImgPerfilComponent } from 'src/app/components/url-img-perfil/url-img-perfil.component';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {
  usuario: any = { }
  photoUploading: String

  constructor(
    private toastComponent: ToastComponent,
    private alertComponent: AlertComponent,
    private loadingComponent: LoadingComponent,
    public urlImgPerfilComponent: UrlImgPerfilComponent,

    private _serviceUsuario: UsuarioService,
    private menu: MenuController,
    private router: Router,

  ) { }

  ngOnInit() {    
    this.datosUsuario()
  }

datosUsuario(){
  this._serviceUsuario.obtenerUsuario(localStorage.getItem('usuario')).subscribe(data=>{
    this.usuario.nombre = data.usuario.nombre
    this.usuario.nombre =  localStorage.getItem('nombre') 
    this.usuario.imgPerfil = this.urlImgPerfilComponent.urlCorrecta(data.usuario.imgPerfil) 

  },error=>{
    this.alertComponent.alerta('Error',error.error)
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
    this.menu.enable(true, 'administrador');
    this.menu.open('administrador');
  }

  verPerfil(){
   this.router.navigate(['/administrador/mi-perfil'])
   this.menu.close()
  }
  administrarClientes(){
    this.router.navigate(['/administrador/clientes'])
    this.menu.close()
  }
  administrarEmpledos(){
    this.router.navigate(['/administrador/empleados'])
    this.menu.close()
  }
  administrarProductos(){
    this.router.navigate(['/administrador/productos'])
    this.menu.close()
  }
  estadisticas(){
    this.router.navigate(['/administrador/estadistica'])
    this.menu.close()
  }
  mensajes(){
    this.router.navigate(['/administrador/mensaje'])
    this.menu.close()
  }
  seguridad(){
   this.router.navigate(['/administrador/seguridad'])
   this.menu.close()
  }
  ayuda(){
   this.router.navigate(['/administrador/ayuda'])
   this.menu.close()
  }

}
