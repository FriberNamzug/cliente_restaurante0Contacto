import { Component, OnInit } from '@angular/core';
import {  FormGroup, Validators,  FormBuilder, Form} from '@angular/forms'
import { Router } from '@angular/router';
import { PasswordService, validacionPasswordPair } from '../../services/password.service';
import { AutenticacionService } from '../../services/autenticacion.service';

/* COMPONENTES */
import { AlertComponent } from '../../components/alert/alert.component';
import { ToastComponent } from '../../components/toast/toast.component';

import { Toast } from '@ionic-native/toast/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup
  check: boolean

  constructor(
    private alertComponent: AlertComponent,
    private toastComponent: ToastComponent,

    public formBuilder: FormBuilder,
    public router: Router,
    public _serviceAutenticacion: AutenticacionService,

    private spinnerDialog: SpinnerDialog,
    private toast: Toast,
  ) { 

    this.formularioRegistro = this.formBuilder.group({
      'email':    ["",Validators.required],
      'password': ["",Validators.required],
      'confirmacionPasswordNew': ["",Validators.required],
      'nombre':   ["",Validators.required],
      'apellido': [""],
      'edad':     [""],
      'telefono': ["", Validators.required],
      'terminosCondiciones': ["",Validators.requiredTrue]
    },{

      validators: validacionPasswordPair

    })

  }

  ngOnInit() {
    this.check = false
  }

  async registro(){
    this.spinnerDialog.show('Validando Datos...',);

    const datos = this.formularioRegistro.value
    this._serviceAutenticacion.signup(datos).subscribe(data => {
      this.spinnerDialog.hide()
      this.router.navigate(['/login'])
      this.toast.show(`${data.message}, Inicia session`, "4000",this.toastComponent.ubicacion).subscribe(
        toast => {
          console.log(toast);
        }
        );
        
      },error=>{
      this.spinnerDialog.hide()
      this.alertComponent.alerta("Error", error.error.message)
    })

  }

  validacionPassword():  boolean  {
    return  this.formularioRegistro.hasError('noSonIguales')  &&
      this.formularioRegistro.get('password').dirty &&
      this.formularioRegistro.get('confirmacionPasswordNew').dirty;
  }


}


