import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Url } from '../../../class/url';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { AlertComponent } from '../../../components/alert/alert.component';
import { ToastComponent } from '../../../components/toast/toast.component';
import { ModalController } from '@ionic/angular';
import { VerEmpleadoPage } from '../../ver-empleado/ver-empleado.page';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  empleados: any []
  constructor(
    public _serviceUsuario: UsuarioService,
    public url: Url,

    public loadingComponent: LoadingComponent,
    public toastComponent: ToastComponent,
    public alertComponent: AlertComponent,
    public modalController: ModalController,

  ) { }

  ngOnInit() {
    this.obtenerEmpleados()
  }



 async obtenerEmpleados(){
    await this.loadingComponent.presentLoading('Obteniendo empleados...')
    this._serviceUsuario.obtenerEmpleados().subscribe(data=>{
      this.loadingComponent.loading.dismiss()
      this.empleados = data.usuarios
    },error=>{
      this.loadingComponent.loading.dismiss()
      this.alertComponent.alerta('Error',error.error.message)
    })

  }

  
 async verEmpleado(){
    
    const modal = await this.modalController.create({
      component: VerEmpleadoPage,
      cssClass: 'my-custom-class',
      animated:true,
      keyboardClose:true,
      componentProps: {
        'id': 'pasarLa Id',
        'nombre': 'this.PRODUCTO.nombre'
      },
    });
    modal.onDidDismiss().then((data) => {
      console.log(data)
      console.log('cerrado')
  });
    return await modal.present();
    

  }
}
