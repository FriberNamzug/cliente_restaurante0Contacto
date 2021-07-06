import { Component, OnInit } from '@angular/core';
import {  FormGroup,  FormControl,  Validators,  FormBuilder, Form} from '@angular/forms'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  formularioLogin: FormGroup



  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public toastController: ToastController,
    public router: Router,
    public _serviceUsuario: UsuarioService
    ) { 

      this.formularioLogin = this.formBuilder.group({
        'email':    ["",Validators.required],
        'password': ["",Validators.required]
      })

    }

  ngOnInit() {
  }


  async ingresar(){

    /* Validamos que se haya escrito en el login */
    if(this.formularioLogin.invalid){
      console.log("Campos vacios, llenalos!!!!")
      
      //mandamos alerta
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      })
      
      await alert.present()
      return
    }
//////////////////////////////////////////

  let datos = this.formularioLogin.value
  this._serviceUsuario.signin(datos).subscribe(data=>{

    let rol = data.usuario.usuarioEncontrado.rol

    if(rol === 'cliente'){

      localStorage.setItem('usuario',JSON.stringify(data.usuario.usuarioEncontrado._id)) //con localStorage guardamos el dato en el navegador
      //console.log(data)
      /* Una notificacion de bienvenido */
      this.toast(`Bienvenido ${data.usuario.usuarioEncontrado.nombre}`)
      this.router.navigate(['/cliente/inicio'])
      

    }if(rol === 'empleado'){

      localStorage.setItem('usuario',JSON.stringify(data.usuario.usuarioEncontrado._id)) //con localStorage guardamos el dato en el navegador
      
      /* Una notificacion de bienvenido */
      this.toast(`Bienvenido ${data.usuario.usuarioEncontrado.nombre}`)
      this.router.navigate(['/empleado/area-trabajo'])

    }if(rol === 'administrador'){

      localStorage.setItem('usuario',JSON.stringify(data.usuario.usuarioEncontrado._id)) //con localStorage guardamos el dato en el navegador
      
      /* Una notificacion de bienvenido */
      this.toast(`Bienvenido ${data.usuario.usuarioEncontrado.nombre}`)
      this.router.navigate(['/administrador/panel-control'])

    }




   },error=>{

     this.alerta("Error",error.error.message)
     console.log(error)

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
