import { Component, OnInit } from '@angular/core';
import {  FormGroup,  FormControl,  Validators,  FormBuilder,ValidationErrors,ValidatorFn, Form} from '@angular/forms'
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { PasswordService, validacionPasswordPair } from '../../services/password.service';


/* COMPONENTES */
import { LoadingComponent } from '../../components/loading/loading.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { ToastComponent } from '../../components/toast/toast.component';

/* NATIVE */
import { TouchID } from '@ionic-native/touch-id/ngx';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.page.html',
  styleUrls: ['./seguridad.page.scss'],
})
export class SeguridadPage implements OnInit {

  formularioActualizacion: FormGroup

  constructor(

    private loadingComponent: LoadingComponent,
    private alertComponent: AlertComponent,
    private touchId: TouchID,
    public formBuilder: FormBuilder,
    public router: Router,
    public _serviceUsuario: UsuarioService,
    public _servicePassword: PasswordService,
    public toastComponent: ToastComponent

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

    this.touchId.isAvailable()
  .then(
    res => console.log('TouchID is available!'),
    err => console.error('TouchID is not available', err)
  );
    

  }


  boton(){
    this.touchId.verifyFingerprint('Scan your fingerprint please')
    .then(
      res => console.log('Ok', res),
      err => console.error('Error', err)
    );
  }

  actualizarPassword(){
    this.loadingComponent.presentLoading('Actualizando password...')

    let idUsuario = localStorage.getItem('usuario')
    
    this.formularioActualizacion.value
    const passwords = {
      viejaPassword: this.formularioActualizacion.get('passwordOld')?.value,
      nuevaPassword: this.formularioActualizacion.get('password')?.value,
    }
    this._servicePassword.actualizarPassword(idUsuario,passwords).subscribe(data=>{
      this.loadingComponent.loading.dismiss()
      this.toastComponent.toast(data.message)

    },error=>{
      this.alertComponent.alerta('Error',error.error.message)
      this.loadingComponent.loading.dismiss()
    })

  }

  validacionPassword():  boolean  {
    return  this.formularioActualizacion.hasError('noSonIguales')  &&
      this.formularioActualizacion.get('password').dirty &&
      this.formularioActualizacion.get('confirmacionPasswordNew').dirty;
  }
 

}
