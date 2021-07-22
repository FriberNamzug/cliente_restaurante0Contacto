import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Url } from '../../../class/url';
import { AlertComponent } from '../../../components/alert/alert.component';
import { ToastComponent } from '../../../components/toast/toast.component';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { VerClientePage } from '../ver-cliente/ver-cliente.page';

import { Toast } from '@ionic-native/toast/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

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
    public toastComponent: ToastComponent,
    public alertComponent: AlertComponent,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private vibration: Vibration,

  ) { }

  ngOnInit() {
    this.obtenerClientes()
  }
 
  doRefresh(event) {
    this.obtenerClientes()
    this.vibration.vibrate(500);
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }


 async obtenerClientesDeshabilitados(){
    this._serviceUsuario.obtenerClientesDeshabilitados().subscribe(data=>{
      this.clientesDeshabilitados = data.usuarios
    },error=>{
        this.toast.show(`${error.error.message}`, this.toastComponent.tiempo,this.toastComponent.ubicacion).subscribe(
          toast => {
            console.log(toast);
          }
        );
      this.mostrar_ocultar = false
      this.textoMostar_ocultar = "No hay Clientes deshabilitados"
    })
  }


  async obtenerClientes(){
    this.spinnerDialog.show()
    this._serviceUsuario.obtenerClientes().subscribe(data=>{  
      this.spinnerDialog.hide()
      this.clientes = data.usuarios
      this.clientVal = data.usuarios.length
      console.log(this.clientVal)
    },error=>{
      this.spinnerDialog.hide()
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
      message: `Estas seguro que quieres deshabilitar <strong>${nombre}</strong>`,
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
        }, {
          text: 'Deshabilitar',
          handler: () => {
            this.spinnerDialog.show();

            this._serviceUsuario.deshabilitarUsuario(id).subscribe(data=>{
                this.toast.show(`${data.message}`,this.toastComponent.tiempo,this.toastComponent.ubicacion).subscribe(
                  toast => {
                    console.log(toast);
                  }
                );
              this.obtenerClientes()
              this.obtenerClientesDeshabilitados()
              this.spinnerDialog.hide()
              this.mostrar_ocultar = false
            },error=>{
                this.toast.show(`${error.message}`, this.toastComponent.tiempo,this.toastComponent.ubicacion).subscribe(
                  toast => {
                    console.log(toast);
                  }
                );
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
        
              this.toast.show(`${data.message}`,this.toastComponent.tiempo,this.toastComponent.ubicacion).subscribe(
                  toast => {
                    console.log(toast);
                  }
                );

              this.obtenerClientes()
              this.obtenerClientesDeshabilitados()
              this.spinnerDialog.hide()

            },error=>{
                this.toast.show(`${error.message}`,this.toastComponent.tiempo,this.toastComponent.ubicacion).subscribe(
                  toast => {
                    console.log(toast);
                  }
                );
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
