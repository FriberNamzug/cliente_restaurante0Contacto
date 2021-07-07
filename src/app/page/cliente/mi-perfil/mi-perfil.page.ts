import { Component, OnInit } from '@angular/core';
import {  FormGroup,  FormControl,  Validators,  FormBuilder, Form} from '@angular/forms'
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../interfaces/usuario';
import { LoadingController } from '@ionic/angular';
import { Plugin } from '@capacitor/core';
@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage implements OnInit {

  formularioActualizacion: FormGroup
  usuario: Usuario
  carga = false
  photo
  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public router: Router,
    public _serviceUsuario: UsuarioService,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) {
    this.formularioActualizacion = this.formBuilder.group({
      'email':    ["",Validators.required],
      'nombre':   ["",Validators.required],
      'apellido': [""],
      'edad':     [""],
      'telefono': ["", Validators.required],
      'recibirPromociones': [""]
    })

   }

  ngOnInit() {

    this.usuario = {}
    this.obtenerUsuario()
  }

  /*   Obtener el usuario desde la api  */

   obtenerUsuario(){

    let idUsuario = JSON.parse(localStorage.getItem('usuario'))
    console.log("Tu Id de usuario: " + idUsuario)

   this._serviceUsuario.obtenerUsuario(idUsuario).subscribe(data=>{


    this.usuario = data.usuario

    console.log(this.usuario)

    this.formularioActualizacion.setValue({
      email: this.usuario.email,
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      edad: this.usuario.edad,
      telefono: this.usuario.telefono,
      recibirPromociones: this.usuario.recibirPromociones
    })

    },error=>{

      this.alerta("error",error)
      console.log(error)

    })
  }

 

  actualizarDatos(){

    const datos = this.formularioActualizacion.value
    console.log(datos)

    this.carga = true
    this._serviceUsuario.actualizarCliente(this.usuario._id,datos).subscribe(data=>{

      console.log(data)
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      this.toast(data.message)



    },error=>{
      this.alerta("error",error)
      console.log(error)
    })

  }




// where getData() method is what does the actually loading of the data like:





  actualizarPassword(){

  }

  async subirFoto(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espera un poco',
      duration: 2000,
      spinner: 'crescent'
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
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
 