import { Component, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../../../services/usuario.service';
import { Url } from '../../../class/url';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { Platform } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';
import { ToastComponent } from '../../../components/toast/toast.component';

@Component({
  selector: 'app-ver-cliente',
  templateUrl: './ver-cliente.page.html',
  styleUrls: ['./ver-cliente.page.scss'],
})
export class VerClientePage implements OnInit {
@Output()id:string;
@Output()nombre:string;
cliente: any = {}
  constructor(    
    
    public modalController: ModalController,
    public _serviceUsuario: UsuarioService,
    public url: Url,   
    public toastComponent: ToastComponent,
    private spinnerDialog: SpinnerDialog,
    private toast: Toast,
    public platform: Platform


) { }

  ngOnInit() {
this.obtenerCliente()
  }
 
  obtenerCliente(){
    this.spinnerDialog.show();

    this._serviceUsuario.obtenerUsuario(this.id).subscribe(data=>{
      this.spinnerDialog.hide();
      this.cliente = data.usuario
    },error=>{
      if(this.platform.is('android')){
        this.toast.show(`${error.error.message}`, this.toastComponent.tiempo,this.toastComponent.ubicacion)
      }else{
        this.toastComponent.toast(error.error.message)
      }
      this.spinnerDialog.hide();
    })
  }

  

  async dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });

  }



}
