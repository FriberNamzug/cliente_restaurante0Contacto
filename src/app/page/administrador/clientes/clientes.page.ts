import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Url } from '../../../class/url';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { AlertComponent } from '../../../components/alert/alert.component';
import { ToastComponent } from '../../../components/toast/toast.component';
import { ModalController } from '@ionic/angular';
import { VerClientePage } from '../../ver-cliente/ver-cliente.page';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  clientes: any []

  constructor(
    public _serviceUsuario: UsuarioService,
    public url: Url,

    public loadingComponent: LoadingComponent,
    public toastComponent: ToastComponent,
    public alertComponent: AlertComponent,
    public modalController: ModalController,

  ) { }

  ngOnInit() {
    this.obtenerClientes()
  }

  async obtenerClientes(){
    await this.loadingComponent.presentLoading('Obteniendo clientes...')
    this._serviceUsuario.obtenerClientes().subscribe(data=>{  
      this.loadingComponent.loading.dismiss()
      this.clientes = data.usuarios
      
    },error=>{
      this.loadingComponent.loading.dismiss()
      this.alertComponent.alerta('Error',error.error.message)
    })
  }

 async verCliente(){
    const modal = await this.modalController.create({
      component: VerClientePage,
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
