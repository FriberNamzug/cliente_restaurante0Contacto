import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { UrlImgPerfilComponent } from 'src/app/components/url-img-perfil/url-img-perfil.component';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.page.html',
  styleUrls: ['./empleado.page.scss'],
})
export class EmpleadoPage implements OnInit {
  usuario: any = {}

  constructor(
    private toastComponent: ToastComponent,
    private alertComponent: AlertComponent,
    private loadingComponent: LoadingComponent,
    public urlImgPerfilComponent: UrlImgPerfilComponent,

    private menu: MenuController,
    private router: Router,

  ) { }

  ngOnInit() {
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
    this.menu.enable(true, 'empleado');
    this.menu.open('empleado');
  }

  verPerfil(){
   this.router.navigate(['/empleado/mi-perfil'])
   this.menu.close()
  }

  pedidos(){
    this.router.navigate(['/empleado/pedidos'])
    this.menu.close()
  }

  mensajes(){
    this.router.navigate(['/empleado/mensaje'])
    this.menu.close()
  }
  seguridad(){
   this.router.navigate(['/empleado/seguridad'])
   this.menu.close()
  }
  ayuda(){
   this.router.navigate(['/empleado/ayuda'])
   this.menu.close()
  }


}
