import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Url } from '../../../class/url';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { AlertComponent } from '../../../components/alert/alert.component';
import { ToastComponent } from '../../../components/toast/toast.component';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { VerClientePage } from '../ver-cliente/ver-cliente.page';
import { Platform } from '@ionic/angular';

import { Toast } from '@ionic-native/toast/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  clientes: any []
  cliente: any = {}
  clientVal: any = {length:0}
  clientesDeshabilitados: any []
  mostrar_ocultar: boolean = false
  textoMostar_ocultar: string = "Ver Clientes deshabilitados"

  constructor(
    public _serviceUsuario: UsuarioService,
    public url: Url,
    private spinnerDialog: SpinnerDialog,
    private toast: Toast,
    public loadingComponent: LoadingComponent,
    public toastComponent: ToastComponent,
    public alertComponent: AlertComponent,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public platform: Platform
    
  ) { }

  ngOnInit() {
    this.obtenerClientes()
  }

  doRefresh(event) {
    this.obtenerClientes()
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }


 async obtenerClientesDeshabilitados(){
    this._serviceUsuario.obtenerClientesDeshabilitados().subscribe(data=>{
      this.clientesDeshabilitados = data.usuarios
    },error=>{
      if(this.platform.is('android')){
        this.toast.show(`${error.error.message}`, this.toastComponent.tiempo,this.toastComponent.ubicacion)
      }else{
        this.toastComponent.toast(error.error.message)
      }
      this.mostrar_ocultar = false
      this.textoMostar_ocultar = "No hay Clientes deshabilitados"
    })
  }


  async obtenerClientes(){

    this._serviceUsuario.obtenerClientes().subscribe(data=>{  
      this.clientes = data.usuarios
      this.clientVal = data.usuarios.length
      console.log(this.clientVal)
    },error=>{
      this.alertComponent.alerta('Error',error.error.message)

    })
  }

 async opcionesCliente(idCliente){

  this._serviceUsuario.obtenerUsuario(idCliente).subscribe(data=>{
    this.cliente = data.usuario
    console.log(this.cliente)
  })

  const actionSheet = await this.actionSheetController.create({
    header: `Opciones`,
    cssClass: 'my-custom-class',
    buttons: [{
      text: `Ver`,
      icon: 'heart',
      handler: () => {

        this.verCliente()

      }
    },
    {
      text: 'Deshabilitar Cliente',
      icon: 'trash',
      handler: () => {

        this.alertaDeshabilitadoCliente(`${this.cliente.nombre}`,idCliente)

      }
    },
     {
      text: 'Cancel',
      icon: 'close',
    }]
  });
  await actionSheet.present();

  }


  async verCliente(){
    const modal = await this.modalController.create({
      component: VerClientePage,
      cssClass: 'my-custom-class',
      animated:true,
      keyboardClose:true,
      componentProps: {
        'id': this.cliente._id,
        'nombre': this.cliente.nombre
      },
    });
    modal.onDidDismiss().then((data) => {
      console.log(data)
      console.log('cerrado')
      
  });
    return await modal.present();

  }
/////////////////
//Deshabilitar cuenta
/////////////////
  async alertaDeshabilitadoCliente(nombre:string, id:any){
  
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: `ATENCION!`,
      message: `Estas seguro que quieres eliminar <strong>${nombre}</strong>`,
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
        }, {
          text: 'Eliminar',
          handler: () => {
            this.spinnerDialog.show();

            this._serviceUsuario.deshabilitarUsuario(id).subscribe(data=>{
              if(this.platform.is('android')){
                this.toast.show(`${data.message}`,this.toastComponent.tiempo,this.toastComponent.ubicacion)
              }else{
                this.toastComponent.toast(data.message)
              }
              this.obtenerClientes()
              this.obtenerClientesDeshabilitados()
              this.spinnerDialog.hide()
              this.mostrar_ocultar = false
            },error=>{
              if(this.platform.is('android')){
                this.toast.show(`${error.message}`, this.toastComponent.tiempo,this.toastComponent.ubicacion)
              }else{
                this.toastComponent.toast(error.message)
              }
              this.obtenerClientes()
              this.obtenerClientesDeshabilitados()
              this.spinnerDialog.hide()
            })
          }
        }
      ]
    });
  
    await alert.present();

  }

  async habilitarCliente(id){



    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: `ATENCION!`,
      message: `Estas seguro que quieres habilitar a este cliente`,
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
        }, {
          text: 'Habilitar',
          handler: () => {
            this.spinnerDialog.show();

            this._serviceUsuario.habilitarClienteEmpleado(id).subscribe(data=>{
        
              if(this.platform.is('android')){
                this.toast.show(`${data.message}`,this.toastComponent.tiempo,this.toastComponent.ubicacion)
              }else{
                this.toastComponent.toast(data.message)
              }

              this.obtenerClientes()
              this.obtenerClientesDeshabilitados()
              this.spinnerDialog.hide()

            },error=>{
              if(this.platform.is('android')){
                this.toast.show(`${error.message}`,this.toastComponent.tiempo,this.toastComponent.ubicacion)
              }else{
                this.toastComponent.toast(error.message)
              }
              this.obtenerClientes()
              this.obtenerClientesDeshabilitados()
              this.spinnerDialog.hide()
            })



          }
        }
      ]
    });
  
    await alert.present();






  }

  mostrarDeshabilitados(){
    if(this.mostrar_ocultar == true){
      this.mostrar_ocultar = false
      this.textoMostar_ocultar = "Ver Clientes deshabilitados"
    }else{
      
      this.textoMostar_ocultar = "Ocultar Clientes deshabilitados"
      this.mostrar_ocultar = true
      this.obtenerClientesDeshabilitados()
    }
  }

}
