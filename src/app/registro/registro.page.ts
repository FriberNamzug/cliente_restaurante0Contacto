import { Component, OnInit } from '@angular/core';
import {  FormGroup,  FormControl,  Validators,  FormBuilder, Form} from '@angular/forms'
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup
  check: boolean

  constructor(
    
    public formBuilder: FormBuilder,
    public alertController: AlertController,
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

    const datos = this.formularioRegistro.value
    
    this._serviceUsuario.signup(datos).subscribe(data => {

      console.log(data)
      this.alerta(data.message,"Inicia sesion con tus datos que anteriormente registraste")
      this.router.navigate(['/login'])

    },error=>{
      this.alerta("Error", error.error.message)
    })

  }

  ////////////////////////////////////////////////////
  //        Esto envia las alertas
  ////////////////////////////////////////////////////
  
  async alerta(titulo:string,mensaje?:string){
      const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();

  }



  async toast(mensaje:string){

    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });


    await toast.present();
  }


}


