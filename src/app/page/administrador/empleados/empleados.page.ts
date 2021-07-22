import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Url } from '../../../class/url';
import { AlertComponent } from '../../../components/alert/alert.component';
import { ToastComponent } from '../../../components/toast/toast.component';
import { VerEmpleadoPage } from '../../ver-empleado/ver-empleado.page';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import {  FormGroup,  FormControl,  Validators,  FormBuilder,ValidationErrors,ValidatorFn, Form} from '@angular/forms'


import { Toast } from '@ionic-native/toast/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  empleados: any []
  empleado: any = {}
  empVal: any = {length:0}

  empleadosDeshabilitados: any []
  mostrar_ocultarDes: boolean = false
  mostrar_ocultarReg: boolean = false
  textoMostar_ocultarDes: string = "Ver Empleados deshabilitados"
  textoMostar_ocultarReg: string = "Registrar Empleado"
  formularioRegistro: FormGroup

  constructor(
    public _serviceUsuario: UsuarioService,
    public url: Url,
    public toastComponent: ToastComponent,
    public alertComponent: AlertComponent,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public formBuilder: FormBuilder,

    private spinnerDialog: SpinnerDialog,
    private toast: Toast,
    private vibration: Vibration,
  ) { 

    this.formularioRegistro = this.formBuilder.group({
      'email':    ["",Validators.required],
      'password':   ["",Validators.required],
      'nombre': ["",Validators.required],
      'apellido': ["",Validators.required],
      'edad':     ["",Validators.required],
      'telefono':     ["",Validators.required],
    })

  }

  ngOnInit() {
    this.obtenerEmpleados()
  }


  registrarEmpleado(){
    this.spinnerDialog.show('Registrando ...')
    let empleado = this.formularioRegistro.value
    this._serviceUsuario.crearEmpleado(empleado).subscribe(data=>{
      this.spinnerDialog.hide()
      this.toast.show(data.message,this.toastComponent.tiempo,this.toastComponent.ubicacion).subscribe(data=>{
        console.log(data)
      })
      this.obtenerEmpleados()
      this.mostrar_ocultarReg = false
      this.formularioRegistro.reset()
    },error=>{
      this.spinnerDialog.hide()
      this.mostrar_ocultarReg = false
      this.alertComponent.alerta(error.error)
      this.formularioRegistro.reset()
    })
  }



  doRefresh(event) {
    this.obtenerEmpleados()
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  obtenerEmpleados(){
    this.spinnerDialog.show('Obteniendo empleados...',)
    this._serviceUsuario.obtenerEmpleados().subscribe(data=>{
      this.spinnerDialog.hide()
      this.empleados = data.usuarios
      this.empVal = data.usuarios.length
      console.log(this.empleados)
    },error=>{
      this.spinnerDialog.hide()
      this.alertComponent.alerta('Error',error.error.message)
    })

  }
  obtenerEmpleadosDeshabilitados(){
    this._serviceUsuario.obtenerEmpleadoDeshabilitados().subscribe(data=>{
      this.empleadosDeshabilitados = data.usuarios
    },error=>{

      this.toast.show(`${error.error.message}`, this.toastComponent.tiempo,this.toastComponent.ubicacion).subscribe(
        toast => {
          console.log(toast);
        }
      );
      this.mostrar_ocultarDes = false
      this.textoMostar_ocultarDes = "No hay Empleados deshabilitados"
    })
  }



  async opciones(idEmpleado:any){ 
      this._serviceUsuario.obtenerUsuario(idEmpleado).subscribe(data=>{
        this.empleado = data.usuario
      })
      const actionSheet = await this.actionSheetController.create({
        header: `Opciones`,
        cssClass: 'my-custom-class',
        buttons: [{
          text: `Ver`,
          icon: 'heart',
          handler: () => {
            this.verEmpleado(this.empleado._id,this.empleado.nombre)
          }},
        {
          text: 'Deshabilitar empleado',
          icon: 'trash',
          handler: () => {
            this.alertaDeshabilitadoEmpleado(this.empleado.nombre,this.empleado._id)
          }},
         {
          text: 'Cancel',
          icon: 'close',
        }]});
      await actionSheet.present();
    }

  
 async verEmpleado(id:any, nombre:any){
    
    const modal = await this.modalController.create({
      component: VerEmpleadoPage,
      cssClass: 'my-custom-class',
      animated:true,
      keyboardClose:true,
      componentProps: {
        'id': id,
        'nombre': nombre
      },
    });
    modal.onDidDismiss().then((data) => {
      console.log(data)
      console.log('cerrado')
  });
    return await modal.present();
  }


  async alertaDeshabilitadoEmpleado(nombre:string, id:any){
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
              this.obtenerEmpleados()
              this.obtenerEmpleadosDeshabilitados()
              this.spinnerDialog.hide()
              this.mostrar_ocultarDes = false
            },error=>{
                this.toast.show(`${error.message}`, this.toastComponent.tiempo,this.toastComponent.ubicacion).subscribe(
                  toast => {
                    console.log(toast);
                  }
                );
              this.obtenerEmpleados()
              this.obtenerEmpleadosDeshabilitados()
              this.spinnerDialog.hide()
            })
          }
        }
      ]
    });
    await alert.present();
  }




  mostrarDeshabilitados(){
    if(this.mostrar_ocultarDes == true){
      this.mostrar_ocultarDes = false
      this.textoMostar_ocultarDes = "Ver Empleados deshabilitados"
    }else{
      
      this.textoMostar_ocultarDes = "Ocultar Empleados deshabilitados"
      this.mostrar_ocultarDes = true
      this.obtenerEmpleadosDeshabilitados()
    }
  }

  mostrarRegistro(){
    if(this.mostrar_ocultarReg == true){
      this.mostrar_ocultarReg = false
      this.textoMostar_ocultarReg = "Registrar Empleado"
    }else{
      
      this.textoMostar_ocultarReg = "Ocultar Formulario"
      this.mostrar_ocultarReg = true
    }
  }





  async habilitarEmpleado(id){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: `ATENCION!`,
      message: `Estas seguro que quieres habilitar a este empleado`,
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

              this.obtenerEmpleados()
              this.obtenerEmpleadosDeshabilitados()
              this.spinnerDialog.hide()

            },error=>{
                this.toast.show(`${error.message}`,this.toastComponent.tiempo,this.toastComponent.ubicacion).subscribe(
                  toast => {
                    console.log(toast);
                  }
                );
              this.obtenerEmpleados()
              this.obtenerEmpleadosDeshabilitados()
              this.spinnerDialog.hide()
            })



          }
        }
      ]
    });
  
    await alert.present();
  }












}
