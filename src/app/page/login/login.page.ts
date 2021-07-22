import { Component, OnInit } from '@angular/core';
import {  FormGroup,  FormControl,  Validators,  FormBuilder, Form} from '@angular/forms'
import { Router } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { ToastComponent } from '../../components/toast/toast.component';
import { AutenticacionService } from '../../services/autenticacion.service';

import { Platform } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  formularioLogin: FormGroup
  tiempoToast: string = '2000'
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private toastComponent: ToastComponent,
    private loadingComponent: LoadingComponent,
    private alertComponent: AlertComponent,
    public _serviceAutenticacion: AutenticacionService,
    private spinnerDialog: SpinnerDialog,
    private toast: Toast,
    public platform: Platform

    ) { 

      this.formularioLogin = this.formBuilder.group({
        'email':    ["",Validators.required],
        'password': ["",Validators.required]
      })

    }

  ngOnInit() {
  }


  async ingresar(){

    if(this.platform.is('android')){
      this.spinnerDialog.show();
    }else{
      this.loadingComponent.presentLoading('Autenticando...')
    }

    

    /* Validamos que se haya escrito en el login */
    if(this.formularioLogin.invalid){
      console.log("Campos vacios, llenalos!!!!")
      //mandamos alerta
      this.alertComponent.alerta("Error",'Campos vacios, llenalos!')
//      this.loadingComponent.loading.dismiss()

    }
//////////////////////////////////////////

  let datos = this.formularioLogin.value
  
  this._serviceAutenticacion.signin(datos).subscribe(data=>{
  
    let rol = data.usuario.usuarioEncontrado.rol
    localStorage.setItem('usuario',data.usuario.usuarioEncontrado._id) 
    localStorage.setItem('rol',data.usuario.usuarioEncontrado.rol) 
    this.formularioLogin.reset()

    if(this.platform.is('android')){
      this.spinnerDialog.hide()
      this.toast.show(`Bienvenido ${data.usuario.usuarioEncontrado.nombre}`, this.toastComponent.tiempo,this.toastComponent.ubicacion)
    }else{
      this.toastComponent.toast(`Bienvenido ${data.usuario.usuarioEncontrado.nombre}`)
      this.loadingComponent.loading.dismiss()
    }

    if(rol === 'cliente'){
      this.router.navigate(['/cliente/inicio'])
    }else if(rol === 'empleado'){
      this.router.navigate(['/empleado/area-trabajo'])
    }else if(rol === 'administrador'){
      this.router.navigate(['/administrador/panel-control'])
    }
    
   },error=>{

    if(this.platform.is('android')){
      this.spinnerDialog.hide()
      this.toast.show(` Error, ${error.error.message}`, this.tiempoToast, 'bottom').subscribe(
        toast => {
          console.log(toast);
          console.log('Poner un reload o algo en caso de que falle el login por ejemplo por falta de internet o algo')
        }
      )
    }else{
      this.alertComponent.alerta("Error",error.error.message)
      this.loadingComponent.loading.dismiss()
    }

    this.formularioLogin.reset()
    console.log(error)

   })


  }

}
