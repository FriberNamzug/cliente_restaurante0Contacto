import { Component, OnInit } from '@angular/core';
import {  FormGroup,  FormControl,  Validators,  FormBuilder, Form} from '@angular/forms'
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';

/* COMPONENTES */
import { LoadingComponent } from '../components/loading/loading.component';
import { AlertComponent } from '../components/alert/alert.component';
import { ToastComponent } from '../components/toast/toast.component';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup
  check: boolean

  constructor(
    private loadingComponent: LoadingComponent,
    private alertComponent: AlertComponent,

    public formBuilder: FormBuilder,
    public router: Router,
    public _serviceUsuario: UsuarioService,
    public toastController: ToastController
  ) { 

    this.formularioRegistro = this.formBuilder.group({
      'email':    ["",Validators.required],
      'password': ["",Validators.required],
      'nombre':   ["",Validators.required],
      'apellido': [""],
      'edad':     [""],
      'telefono': ["", Validators.required],
      'terminosCondiciones': ["",Validators.requiredTrue]
    })

  }

  ngOnInit() {
    this.check = false
  }

  async registro(){
    this.loadingComponent.presentLoading('Validando datos...')

    const datos = this.formularioRegistro.value
    
    this._serviceUsuario.signup(datos).subscribe(data => {

      this.loadingComponent.loading.dismiss()
      this.alertComponent.alerta(data.message,"Inicia sesion con tus datos que anteriormente registraste")
      this.router.navigate(['/login'])

    },error=>{
      this.loadingComponent.loading.dismiss()
      this.alertComponent.alerta("Error", error.error.message)
    })

  }


}


