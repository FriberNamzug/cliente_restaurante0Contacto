import { Component, OnInit } from '@angular/core';
import {  FormGroup,  FormControl,  Validators,  FormBuilder,ValidationErrors,ValidatorFn, Form} from '@angular/forms'
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { PasswordService, validacionPasswordPair } from '../../services/password.service';


/* COMPONENTES */
import { AlertComponent } from '../../components/alert/alert.component';
import { ToastComponent } from '../../components/toast/toast.component';

/* NATIVE */
import { Toast } from '@ionic-native/toast/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.page.html',
  styleUrls: ['./seguridad.page.scss'],
})
export class SeguridadPage implements OnInit {

  formularioActualizacion: FormGroup

  constructor(

    private alertComponent: AlertComponent,
    public formBuilder: FormBuilder,
    public router: Router,
    public _serviceUsuario: UsuarioService,
    public _servicePassword: PasswordService,
    public toastComponent: ToastComponent,
    private spinnerDialog: SpinnerDialog,
    private toast: Toast,
  ) {
      this.formularioActualizacion = this.formBuilder.group({
        'passwordOld':    ["",Validators.required], 
        'password':    ["",Validators.required], 
        'confirmacionPasswordNew': ["", Validators.required]  
    },{
      validators: validacionPasswordPair
  }) 
}


  ngOnInit() {


  }



  actualizarPassword(){
    this.spinnerDialog.show('Actualizando Passsword')
    let idUsuario = localStorage.getItem('usuario')
    this.formularioActualizacion.value
    const passwords = {
      viejaPassword: this.formularioActualizacion.get('passwordOld')?.value,
      nuevaPassword: this.formularioActualizacion.get('password')?.value,
    }
    this._servicePassword.actualizarPassword(idUsuario,passwords).subscribe(data=>{
      this.spinnerDialog.hide()
      this.toastComponent.toast(data.message)
      this.toast.show(data.message,this.toastComponent.tiempo,this.toastComponent.ubicacion).subscribe(data=>{
        console.log(data)
      })      
    },error=>{
      this.spinnerDialog.hide()
      this.alertComponent.alerta('Error',error.error.message)
    })

  }

  validacionPassword():  boolean  {
    return  this.formularioActualizacion.hasError('noSonIguales')  &&
      this.formularioActualizacion.get('password').dirty &&
      this.formularioActualizacion.get('confirmacionPasswordNew').dirty;
  }
 

}
